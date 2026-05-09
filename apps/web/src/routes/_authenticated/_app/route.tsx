import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _app/route.tsx
      <Outlet />
    </div>
  );
}
