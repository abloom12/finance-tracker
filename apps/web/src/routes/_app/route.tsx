import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
  beforeLoad: () => {},
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
