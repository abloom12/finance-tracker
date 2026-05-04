# Fix `@acme/api` Declaration Build Errors

## Summary

The `TS2883` errors happen because `createApi()` is exported without an explicit return type. During declaration emit, TypeScript tries to serialize the inferred Fastify/tRPC return type and ends up referencing pnpm-internal Fastify paths. Fix this by giving `createApi()` a portable public signature and naming the Fastify-facing context types explicitly.

## Key Changes

- Update [index.ts](/Users/ash/dev/finance-tracker/packages/api/src/index.ts) to export named public types:
  - `ApiDeps`
  - `ApiSession`
  - `ApiContext`
  - `CreateApiContext`
  - `Api`
  - `AppRouter`
- Change `createApi(auth: any)` to `createApi(deps: ApiDeps): Api`.
- Keep Fastify types behind `CreateFastifyContextOptions` indexed access instead of letting TS infer `FastifyRequest`, `FastifyReply`, etc.
- Prefer the existing repo direction from `refactor.md`: call `createApi({ auth })`, not `createApi(auth)`.

## Code Example

```ts
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { initTRPC, TRPCError } from '@trpc/server';
import { fromNodeHeaders } from 'better-auth/node';

export type ApiSession = { user: unknown; session: unknown } | null;

export type ApiDeps = {
  auth: {
    api: { getSession(input: { headers: Headers }): Promise<ApiSession> };
  };
};

export type ApiContext = {
  req: CreateFastifyContextOptions['req'];
  res: CreateFastifyContextOptions['res'];
  session: ApiSession;
};

export type CreateApiContext = (
  options: CreateFastifyContextOptions,
) => Promise<ApiContext>;

function createContextFactory({ auth }: ApiDeps): CreateApiContext {
  return async function createContext({ req, res }) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return { req, res, session };
  };
}

function createAppRouter() {
  const t = initTRPC.context<ApiContext>().create();

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

  return router({ health: healthRouter });
}

export type AppRouter = ReturnType<typeof createAppRouter>;

export type Api = { appRouter: AppRouter; createContext: CreateApiContext };

export function createApi(deps: ApiDeps): Api {
  return {
    appRouter: createAppRouter(),
    createContext: createContextFactory(deps),
  };
}
```

Server usage becomes:

```ts
const { appRouter, createContext } = createApi({ auth });
```

## Test Plan

- Run `pnpm --filter @acme/api build`.
- If server tRPC wiring is uncommented, run `pnpm --filter @acme/server typecheck`.
- Confirm generated `packages/api/dist/index.d.ts` references package imports like `@trpc/server/adapters/fastify`, not `.pnpm/fastify...` paths.

## Assumptions

- `@acme/api` should keep exporting the concrete `AppRouter` type for client-side tRPC typing.
- `@acme/server` owns the real Better Auth instance and passes it into `@acme/api`.
- `ApiSession` only models the fields this package currently uses: `user` and `session`.
