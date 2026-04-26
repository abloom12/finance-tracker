import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, openAPI, organization } from 'better-auth/plugins';

import { db } from '../drizzle/db';
import { config } from '../env';

export const auth = betterAuth({
  appName: 'API',
  advanced: { database: { generateId: 'uuid' } },
  baseURL: config.auth.baseUrl!,
  database: drizzleAdapter(db, { provider: 'pg' }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [admin(), organization(), openAPI()],
  trustedOrigins: [
    config.appOrigin || 'http://localhost:3000',
    'http://localhost:5173',
  ],
  session: { cookieCache: { enabled: true, maxAge: 60 * 5 } },
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
