import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/setup/bills')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>_authenticated/setup.bills.tsx</div>;
}
