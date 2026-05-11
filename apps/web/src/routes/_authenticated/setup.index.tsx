import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/setup/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _authenticated/setup.index.ts
      <Outlet />
    </div>
  );
}
