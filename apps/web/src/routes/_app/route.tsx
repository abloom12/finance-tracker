import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { authClient } from '@/lib/auth-client';

export const Route = createFileRoute('/_app')({
  // beforeLoad: async () => {
  //   const session = await authClient.getSession();

  //   if (!session.data) {
  //     throw redirect({
  //       to: '/login',
  //       search: { redirect: location.pathname + location.search },
  //     });
  //   }

  //   return { session };
  // },
  component: RouteComponent,
});

function RouteComponent() {
  // const { session } = Route.useRouteContext();

  return <Outlet />;
}
