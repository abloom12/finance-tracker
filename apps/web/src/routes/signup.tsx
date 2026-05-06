import { createFileRoute } from '@tanstack/react-router';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignupForm } from '@/features/auth/signup-form';

export const Route = createFileRoute('/signup')({ component: RouteComponent });

function RouteComponent() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Creat an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
