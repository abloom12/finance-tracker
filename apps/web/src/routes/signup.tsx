import { createFileRoute, useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';
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
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { auth } = Route.useRouteContext();

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

      //? idk about the below, might be different since we do email verification

      await auth.refetchSession();
      await router.invalidate();

      if (search.redirect) {
        router.history.push(search.redirect);
        return;
      }

      await navigate({ to: '/settings' });
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
        </CardContent>
      </Card>
    </div>
  );
}
