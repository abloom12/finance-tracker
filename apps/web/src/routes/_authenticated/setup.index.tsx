import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/setup/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>setup.index.ts</div>;
}
