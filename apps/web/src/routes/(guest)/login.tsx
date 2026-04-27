import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from './-components/LoginForm';

export const Route = createFileRoute('/(guest)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
