import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/setup')({
  beforeLoad: () => {
    // if user has completed onboarding redirect to /
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>_authenticated/setup.tsx</h1>
      <Outlet />
    </div>
  );
}
