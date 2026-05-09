import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/setup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>setup.tsx</h1>
      <Outlet />
    </div>
  );
}
