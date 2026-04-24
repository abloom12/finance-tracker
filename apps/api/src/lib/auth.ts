import { betterAuth } from "better-auth";
import {
  admin,
  haveIBeenPwned,
  openAPI,
  organization,
  username,
} from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "../db";

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  plugins: [admin(), haveIBeenPwned(), organization(), openAPI(), username()],
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
