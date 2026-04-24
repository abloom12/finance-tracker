import type { FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { fromNodeHeaders } from "better-auth/node";
import Fastify from "fastify";

import type { AppRouter } from "./trpc";
import { auth } from "./lib/auth";
import { appRouter } from "./trpc";
import { createContext } from "./trpc/context";

const a = { "a": 1, "ash-two": 2 };
console.log("hello world");

export const server = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
    },
  },
  routerOptions: { maxParamLength: 5000 },
});

server.register(fastifyCors, {
  origin: process.env.APP_ORIGIN! || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86400,
});
server.register(fastifyHelmet);
server.register(fastifyRateLimit, { max: 100, timeWindow: "1 minute" });

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      server.log.error(
        `Error in tRPC handler on path '${path}':${error.message}`,
      );
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

server.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  handler: async (request, reply) => {
    try {
      // Construct request URL
      const url = new URL(request.url, process.env.BETTER_AUTH_URL!);

      // Convert Fastify headers to standard Headers object
      const headers = fromNodeHeaders(request.headers);

      // Create Fetch API-compatible request
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
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
        .send({ error: "Internal authentication error", code: "AUTH_FAILURE" });
    }
  },
});

server.listen(
  { port: Number(process.env.PORT) ?? 3000, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    server.log.info(`server listening on ${address}`);
  },
);
