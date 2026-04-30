import { createFileRoute } from '@tanstack/react-router';

import { SignupForm } from '@/features/auth/signup-form';

export const Route = createFileRoute('/signup')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div className="w-full max-w-sm">
      <h1>Signup</h1>
      <SignupForm />
    </div>
  );
}
