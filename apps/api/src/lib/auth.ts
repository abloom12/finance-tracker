import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import {
  admin,
  haveIBeenPwned,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';

import { db } from '../drizzle/db.js';
import { config } from '../env.js';

export const auth = betterAuth({
  appName: 'API',
  advanced: { database: { generateId: 'uuid' } },
  baseURL: config.auth.baseUrl!,
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
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
