import { z } from 'zod';

const EnvSchema = z.object({
  APP_ORIGIN: z.url(),
  CORS_ORIGIN: z.string().min(1),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive(),

  // auth
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),

  // database
  DATABASE_URL: z.string().min(1),
});

const env = EnvSchema.parse(process.env);

export const config = {
  auth: { baseUrl: env.BETTER_AUTH_URL, secret: env.BETTER_AUTH_SECRET },
  appOrigin: env.APP_ORIGIN,
  corsOrigin: env.CORS_ORIGIN.split(',')
    .map((s: string) => s.trim())
    .filter(Boolean),
  databaseURL: env.DATABASE_URL,
  isProd: env.NODE_ENV === 'production',
  port: env.PORT,
} as const;
