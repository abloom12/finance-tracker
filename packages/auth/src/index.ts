import type { Auth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import {
  admin,
  haveIBeenPwned,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';
import { z } from 'zod';

import { usePolarPlugin } from './polar.js';

type AuthDb = Parameters<typeof drizzleAdapter>[0];
type AuthInstance = Auth<BetterAuthOptions>;

const authOptionsSchema = z.looseObject({
  appOrigin: z.url(),
  baseURL: z.url().optional(),
  googleClientId: z.string().min(1),
  googleClientSecret: z.string().min(1),
  isProd: z.boolean(),
  polarAccessToken: z.string(),
});

type AuthOptions = BetterAuthOptions & z.infer<typeof authOptionsSchema>;

export function createAuth(db: AuthDb, options: AuthOptions): AuthInstance {
  const polarPlugin = usePolarPlugin(options.polarAccessToken);

  const authOptions: BetterAuthOptions = {
    appName: 'API',
    advanced: { database: { generateId: 'uuid' } },
    baseURL: options.baseURL,
    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 12,
      maxPasswordLength: 128,
      requireEmailVerification: false, // turn on once emailVerification is setup
      revokeSessionsOnPasswordReset: true,
      customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
        ...coreFields,
        // add plugin fields here
        // Admin plugin fields (in schema order)
        role: 'user', // or your configured defaultRole
        banned: false,
        banReason: null,
        banExpires: null,
        // Two Factor plugin
        twoFactorEnabled: false,
        ...additionalFields,
        id,
      }),
      onExistingUserSignUp: async (_data, _request) => {},
      sendResetPassword: async (_data, _request) => {},
      onPasswordReset: async (_data, _request) => {},
    },
    emailVerification: { sendVerificationEmail: async () => {} },
    socialProviders: {
      google: {
        prompt: 'select_account',
        clientId: options.googleClientId,
        clientSecret: options.googleClientSecret,
      },
    },
    plugins: [
      admin({ defaultRole: 'user' }),
      haveIBeenPwned({ enabled: options.isProd }),
      organization(),
      openAPI(),
      twoFactor(),
      polarPlugin,
    ],
    trustedOrigins: [options.appOrigin],
    session: { cookieCache: { enabled: true, maxAge: 60 * 5 } },
  };

  return betterAuth(authOptions);
}
