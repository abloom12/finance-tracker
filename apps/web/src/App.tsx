import { RouterProvider } from '@tanstack/react-router';

import { authClient } from './lib/auth-client.ts';
import { router } from './lib/router.ts';

export function App() {
  const { data: session, isPending, refetch } = authClient.useSession();

  return (
    <RouterProvider
      router={router}
      context={{ auth: { session, isPending, refetchSession: refetch } }}
    />
  );
}
