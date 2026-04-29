import { createFileRoute } from '@tanstack/react-router';

import { SignupForm } from './-components/SignupForm';

export const Route = createFileRoute('/(guest)/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-w-xs">
      <SignupForm />
    </div>
  );
}
