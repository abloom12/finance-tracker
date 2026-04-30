import { TanStackDevtools } from '@tanstack/react-devtools';
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';

import { authClient } from './lib/auth-client.ts';
import { queryClient } from './lib/query-client.ts';
import { router } from './lib/router.ts';

export function App() {
  const { data, isPending, refetch } = authClient.useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          auth: {
            session: data?.session ?? null,
            user: data?.user ?? null,
            isPending,
            refetchSession: refetch,
          },
        }}
      />

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      {import.meta.env.DEV && (
        <TanStackDevtools
          config={{ hideUntilHover: true }}
          plugins={[formDevtoolsPlugin()]}
        />
      )}
    </QueryClientProvider>
  );
}
