import { createFileRoute, useRouter } from '@tanstack/react-router';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignupForm } from '@/features/auth/signup-form';

export const Route = createFileRoute('/signup')({
  beforeLoad: () => {},
  component: SignupPage,
  validateSearch: z.object({ redirect: z.string().optional() }),
});

function SignupPage() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { auth } = Route.useRouteContext();

  const handleSignUpSuccess = async () => {
    await auth.refetchSession();
    await router.invalidate();

    if (search.redirect) {
      router.history.push(search.redirect);
      return;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm onSuccess={handleSignUpSuccess} />
        </CardContent>
      </Card>
    </div>
  );
}
