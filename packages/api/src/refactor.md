**`@acme/api` Router Factory Layout**

**Summary**

`@acme/api` should expose one top-level `createApi()` factory. That factory creates the tRPC context/procedures once, then imports router factory functions from `src/routers/*` and composes them into `appRouter`.

**API Package Structure**

Use this layout:

```txt
packages/api/src/
  index.ts
  context.ts
  trpc.ts
  routers/
    index.ts
    health.ts
```

`@acme/server` imports only from `@acme/api`, not individual router files.

**Key Implementation**

`context.ts` owns request context creation:

```ts
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { fromNodeHeaders } from 'better-auth/node';

export type ApiDeps = {
  auth: {
    api: { getSession: (input: { headers: Headers }) => Promise<unknown> };
  };
};

export function createContextFactory({ auth }: ApiDeps) {
  return async function createContext({
    req,
    res,
  }: CreateFastifyContextOptions) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return { req, res, session };
  };
}
```

`trpc.ts` owns shared tRPC primitives:

```ts
import { initTRPC, TRPCError } from '@trpc/server';

import type { createContextFactory } from './context';

export type Context = Awaited<
  ReturnType<ReturnType<typeof createContextFactory>>
>;

export function createTRPC() {
  const t = initTRPC.context<Context>().create();

  const publicProcedure = t.procedure;

  const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({ ctx: { ...ctx, session: ctx.session } });
  });

  return { router: t.router, publicProcedure, protectedProcedure };
}

export type TRPCFactory = ReturnType<typeof createTRPC>;
```

Each router file exports a factory that receives the shared tRPC primitives:

```ts
import type { TRPCFactory } from '../trpc';

export function createHealthRouter({
  router,
  publicProcedure,
  protectedProcedure,
}: TRPCFactory) {
  return router({
    ping: publicProcedure.query(() => ({ ok: true, message: 'pong' })),
    me: protectedProcedure.query(({ ctx }) => ({ session: ctx.session })),
  });
}
```

`routers/index.ts` composes all router modules:

```ts
import type { TRPCFactory } from '../trpc';
import { createHealthRouter } from './health';

export function createRouters(t: TRPCFactory) {
  return t.router({
    health: createHealthRouter(t),
    // users: createUsersRouter(t),
    // accounts: createAccountsRouter(t),
    // transactions: createTransactionsRouter(t),
  });
}
```

`index.ts` is the public package entrypoint:

```ts
import type { ApiDeps } from './context';
import { createContextFactory } from './context';
import { createRouters } from './routers';
import { createTRPC } from './trpc';

export function createApi(deps: ApiDeps) {
  const createContext = createContextFactory(deps);
  const t = createTRPC();
  const appRouter = createRouters(t);

  return { appRouter, createContext };
}

export type Api = ReturnType<typeof createApi>;
export type AppRouter = Api['appRouter'];
```

**Server Responsibility**

`@acme/server` should create runtime dependencies and wire adapters:

```ts
const auth = createAuth(db, authOptions);

const { appRouter, createContext } = createApi({ auth });

await app.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
});
```

The server should not import `createHealthRouter`, `createUsersRouter`, or any other individual router. It only sees the finished `appRouter`.

**Assumptions**

- Router modules should stay framework-independent except for tRPC types.
- `@acme/api` owns session lookup and protected procedure behavior.
- `@acme/server` owns Fastify plugins, Better Auth route mounting, env, DB creation, and `listen()`.
- Future routers that need dependencies should receive them through `createRouters(t, deps)` or a single `RouterDeps` object, not by importing from `@acme/server`.
