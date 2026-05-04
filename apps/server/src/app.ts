// import type { FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import type { FastifyPluginAsync } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';
// import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { fromNodeHeaders } from 'better-auth/node';

// import { createApi } from '@acme/api';
import { createDB } from '@acme/db';

import { createAuth } from './auth.js';
import { config } from './env.js';

export const app: FastifyPluginAsync = async (server) => {
  const db = createDB(config.database.url);
  const auth = createAuth(db);

  await server.register(fastifyCors, {
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400,
  });

  await server.register(fastifyHelmet);
  await server.register(fastifyRateLimit, { max: 100, timeWindow: '1 minute' });

  server.route({
    method: ['GET', 'POST'],
    url: '/api/auth/*',
    handler: async (request, reply) => {
      try {
        // Construct request URL
        const url = new URL(request.url, config.auth.baseUrl!);

        // Create Fetch API-compatible request
        const req = new Request(url.toString(), {
          method: request.method,
          headers: fromNodeHeaders(request.headers),
          ...(request.body ? { body: JSON.stringify(request.body) } : {}),
        });

        // Process authentication request
        const response = await auth.handler(req);

        // Forward response to client
        reply.status(response.status);

        response.headers.forEach((value, key) => reply.header(key, value));

        return reply.send(response.body ? await response.text() : null);
      } catch (error) {
        server.log.error(`Authentication Error: ${error}`);

        return reply
          .status(500)
          .send({
            error: 'Internal authentication error',
            code: 'AUTH_FAILURE',
          });
      }
    },
  });
};
