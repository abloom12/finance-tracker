// import type { FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import type { FastifyPluginAsync } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';

// import type { AuthInstance, AuthOptions } from '@acme/auth';
import { createAuth } from '@acme/auth';
import { createDB } from '@acme/db';

// import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
// import { fromNodeHeaders } from 'better-auth/node';

import { config } from './env.js';

export const app: FastifyPluginAsync = async (server) => {
  const db = createDB(config.database.url);
  const auth = createAuth(db, {
    baseUrl: config.auth.baseUrl,
    appOrigin: config.appOrigin,
    isProd: config.isProd,
    googleClientId: config.auth.googleClientId,
    googleClientSecret: config.auth.googleClientSecret,
  });

  await server.register(fastifyCors, {
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  });

  await server.register(fastifyHelmet);
  await server.register(fastifyRateLimit, { max: 100, timeWindow: '1 minute' });
};
