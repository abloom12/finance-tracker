import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_app')({
  beforeLoad: () => {
    // if user has not completed onboarding redirect to /setup
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      _authenticated/_app/route.tsx
      <Outlet />
    </div>
  );
}
