import type { Auth, BetterAuthOptions } from 'better-auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
  admin,
  haveIBeenPwned,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';
import { z } from 'zod';

type AuthDb = Parameters<typeof drizzleAdapter>[0];

export type AuthOptions = {
  baseUrl: string;
  appOrigin: string;
  isProd: boolean;
  googleClientId: string;
  googleClientSecret: string;
};

export const authOptionsSchema: z.ZodType<AuthOptions> = z.object({
  baseUrl: z.url(),
  appOrigin: z.url(),
  isProd: z.boolean(),
  googleClientId: z.string().min(1),
  googleClientSecret: z.string().min(1),
});

export type AuthInstance = Auth<BetterAuthOptions>;

export function createAuth(db: AuthDb, options: AuthOptions): AuthInstance {
  const auth = betterAuth({
    appName: 'API',
    advanced: { database: { generateId: 'uuid' } },
    baseURL: options.baseUrl!,
    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      requireEmailVerification: true,
    },
    emailVerification: {},
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
    ],
    trustedOrigins: [options.appOrigin],
    session: { cookieCache: { enabled: true, maxAge: 60 * 5 } },
  } satisfies BetterAuthOptions);

  return auth as unknown as AuthInstance;
}
