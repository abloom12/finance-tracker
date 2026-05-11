import { createRouter } from '@tanstack/react-router';

import type { Session, User } from './auth-client';
import { routeTree } from '../routeTree.gen.ts';
import { queryClient } from './query-client';
import { trpc } from './trpc.ts';

export type RouterContext = {
  auth: {
    session: Session | null;
    user: User | null;
    isPending: boolean;
    refetchSession: () => void | Promise<void>;
  };
  queryClient: typeof queryClient;
  trpc: typeof trpc;
};

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    auth: {
      session: null,
      user: null,
      isPending: true,
      refetchSession: () => {},
    },
    queryClient,
    trpc,
  } satisfies RouterContext,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
