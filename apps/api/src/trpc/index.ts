import { initTRPC, TRPCError } from '@trpc/server';

import type { Context } from './context.js';

// import { z } from "zod";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
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

export const appRouter = router({ health: healthRouter });

export type AppRouter = typeof appRouter;
