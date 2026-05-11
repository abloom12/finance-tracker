import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    // if user is not authenticated redirect to /login
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _authenticated/route.tsx (auth guard at this level)
      <Outlet />
    </div>
  );
}
