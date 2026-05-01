import Fastify from 'fastify';

import { app } from './app.js';
import { config } from './env.js';

async function main() {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
      },
    },
    routerOptions: { maxParamLength: 5000 },
  });

  await server.register(app);

  const close = async () => {
    server.log.info('shutting down');

    try {
      await server.close();
      process.exit(0);
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  };

  process.once('SIGINT', close);
  process.once('SIGTERM', close);

  try {
    const address = await server.listen({
      port: config.port ?? 3000,
      host: '127.0.0.1',
    });

    server.log.info(`server listening on ${address}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

void main();
