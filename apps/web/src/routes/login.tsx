import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { SocialAuthButton } from '@/components/google-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {},
  component: RouteComponent,
  validateSearch: z.object({ redirect: z.string().optional() }),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(12).max(128),
  rememberMe: z.boolean().optional(),
});

type LoginSchema = z.infer<typeof loginSchema>;

function RouteComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { auth } = Route.useRouteContext();

  const handleLoginSuccess = async (
    error: { message?: string } | null | undefined,
  ) => {
    if (error) {
      toast.error(error.message);
      return;
    }

    await auth.refetchSession();
    await router.invalidate();

    if (search.redirect) {
      router.history.push(search.redirect);
      return;
    }

    await navigate({ to: '/settings' });
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    const { error } = await authClient.signIn.social({ provider });

    handleLoginSuccess(error);
  };

  const handleEmailLogin = async ({ value }: { value: LoginSchema }) => {
    const { error } = await authClient.signIn.email({
      email: value.email,
      password: value.password,
    });

    handleLoginSuccess(error);
  };

  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as LoginSchema,
    validators: { onChange: loginSchema },
    onSubmit: handleEmailLogin,
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.AppField
                name="email"
                children={(field) => <field.InputField label="Email" />}
              />
              <form.AppField
                name="password"
                children={(field) => <field.PasswordField label="Password" />}
              />

              <form.AppForm>
                <Field>
                  <form.SubmitButton label="Login" />
                </Field>
              </form.AppForm>
            </FieldGroup>
          </form>

          <Separator className="mb-4" />

          <SocialAuthButton
            provider="google"
            onClick={() => handleSocialLogin('google')}
            className="mb-4"
          />

          <div className="flex items-center justify-center">
            <p>Don't have an account?</p>
            <Button asChild variant="link">
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
