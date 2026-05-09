import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/setup/income')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>setup.income.tsx</div>;
}
