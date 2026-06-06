import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { SocialAuthButton } from '@/components/social-auth-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';

export const Route = createFileRoute('/signup')({
  beforeLoad: () => {},
  component: RouteComponent,
  validateSearch: z.object({ redirect: z.string().optional() }),
});

const signupSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .refine((v) => (v ? z.email().safeParse(v).success : true), {
        message: 'Invalid email address',
      }),
    password: z.string().superRefine((password, ctx) => {
      if (!password) {
        ctx.addIssue({ code: 'custom', message: 'Password is required.' });
        return;
      }
    }),
    confirm: z.string(),
    image: z.string().optional(),
  })
  .refine(({ password, confirm }) => !password || !!confirm, {
    message: 'Please confirm your password.',
    path: ['confirm'],
  })
  .refine(
    ({ password, confirm }) => !password || !confirm || password === confirm,
    { message: 'Passwords do not match', path: ['confirm'] },
  );

type SignupSchema = z.infer<typeof signupSchema>;

function RouteComponent() {
  const navigate = useNavigate({ from: '/' });
  // const { isPending } = authClient.useSession();

  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    } as SignupSchema,
    validators: { onChange: signupSchema },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signUp.email({
        name: value.name,
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
  });

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
                name="name"
                children={(field) => <field.InputField label="Name" />}
              />
              <form.AppField
                name="email"
                children={(field) => (
                  <field.InputField label="Email" type="email" />
                )}
              />
              <form.AppField
                name="password"
                children={(field) => <field.PasswordField label="Password" />}
              />
              <form.AppField
                name="confirm"
                children={(field) => (
                  <field.PasswordField label="Confirm Password" />
                )}
              />

              <form.AppForm>
                <Field>
                  <form.SubmitButton label="Create Account" />
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
            <p>Already have an account?</p>
            <Button asChild variant="link">
              <Link to={'/login'}>Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
