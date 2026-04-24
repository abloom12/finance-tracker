import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { auth } from "../lib/auth";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const session = await auth.api.getSession({ headers: req.headers });
  return { req, res, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

// @ianvs/prettier-plugin-sort-imports
// prettier-plugin-tailwindcss