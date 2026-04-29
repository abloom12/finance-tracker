import type { Session } from '@/lib/auth-client';
import { createRouter } from '@tanstack/react-router';

import { routeTree } from '../routeTree.gen.ts';

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  context: {
    auth: { session: null, isPending: true, refetchSession: () => {} },
  },
});

export type RouterContext = {
  auth: {
    session: Session | null;
    isPending: boolean;
    refetchSession: () => void | Promise<unknown>;
  };
};

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
