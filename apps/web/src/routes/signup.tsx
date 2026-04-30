import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({ component: RouteComponent });

function RouteComponent() {
  return (
    <>
      <h1>Signup</h1>
    </>
  );
}
