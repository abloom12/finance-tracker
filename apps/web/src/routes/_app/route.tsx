import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.pathname + location.search },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { auth } = Route.useRouteContext();

  if (auth.isPending) {
    return null; // or spinner
  }

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to="/login"
        search={{ redirect: location.pathname + location.search }}
      />
    );
  }

  return <Outlet />;
}
