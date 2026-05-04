import { initTRPC, TRPCError } from '@trpc/server';
import { type CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { fromNodeHeaders } from 'better-auth/node';

export function createApi(auth: any) {
  async function createContext({ req, res }: CreateFastifyContextOptions) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return { req, res, session };
  }

  type Context = Awaited<ReturnType<typeof createContext>>;

  const t = initTRPC.context<Context>().create();

  const router = t.router;
  const publicProcedure = t.procedure;

  const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session?.user || !ctx.session?.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: { ...ctx, session: ctx.session, user: ctx.session.user },
    });
  });

  const healthRouter = router({
    ping: publicProcedure.query(() => ({ ok: true, message: 'pong' })),
    me: protectedProcedure.query(({ ctx }) => ({ user: ctx.user })),
  });

  const appRouter = router({ health: healthRouter });

  return { appRouter, createContext };
}

export type Api = ReturnType<typeof createApi>;
export type AppRouter = Api['appRouter'];
