import { toast } from 'sonner';

import { Field, FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';
import type { LoginSchema } from './schemas';
import { loginSchema } from './schemas';

export function LoginForm() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as LoginSchema,
    validators: { onChange: loginSchema },
    onSubmit: async ({ value }) => {
      try {
        await authClient.signIn.email(
          { ...value, callbackURL: '/' },
          {
            onSuccess: () => {
              toast.success('yay!');
            },
            onError: () => {
              // show error message
              toast.error('uh oh');
            },
          },
        );
      } catch (error) {
        toast.error('error');
      }
    },
  });

  return (
    <form
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
  );
}
