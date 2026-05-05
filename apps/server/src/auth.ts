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

import { config } from './env.js';

type AuthDb = Parameters<typeof drizzleAdapter>[0];
type AuthInstance = Auth<BetterAuthOptions>;

export function createAuth(db: AuthDb): AuthInstance {
  const authOptions: BetterAuthOptions = {
    appName: 'API',
    advanced: { database: { generateId: 'uuid' } },
    baseURL: config.auth.baseUrl,
    database: drizzleAdapter(db, { provider: 'pg' }),
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      requireEmailVerification: false, // turn on once emailVerification is setup
    },
    emailVerification: {},
    socialProviders: {
      google: {
        prompt: 'select_account',
        clientId: config.auth.googleClientId,
        clientSecret: config.auth.googleClientSecret,
      },
    },
    plugins: [
      admin({ defaultRole: 'user' }),
      haveIBeenPwned({ enabled: config.isProd }),
      organization(),
      openAPI(),
      twoFactor(),
    ],
    trustedOrigins: [config.appOrigin],
    session: { cookieCache: { enabled: true, maxAge: 60 * 5 } },
  };

  return betterAuth(authOptions);
}
