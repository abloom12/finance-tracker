import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/_app/goals')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>_app/goals.tsx</div>;
}
