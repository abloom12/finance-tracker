import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { SocialAuthButton } from '@/components/social-auth-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {},
  component: RouteComponent,
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(12).max(128),
  rememberMe: z.boolean(),
});

function RouteComponent() {
  const navigate = useNavigate({ from: '/' });
  // const { isPending } = authClient.useSession();

  const form = useAppForm({
    defaultValues: { email: '', password: '', rememberMe: false },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      navigate({ to: '/forecast' });
      toast.success('Sign in successful');
    },
    validators: { onChange: loginSchema },
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
            onClick={() => {}}
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
