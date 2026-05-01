import { createFileRoute } from '@tanstack/react-router';

import { LoginForm } from '@/features/auth/login-form';

export const Route = createFileRoute('/login')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div className="w-full max-w-sm">
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
