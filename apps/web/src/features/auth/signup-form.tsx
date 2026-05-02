import { toast } from 'sonner';

import { Field, FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/hooks/form';
import { authClient } from '@/lib/auth-client';
import type { SignupSchema } from './schemas';
import { signupSchema } from './schemas';

export function SignupForm() {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    } as SignupSchema,
    validators: { onChange: signupSchema },
    onSubmit: async ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirm, ...reqBody } = value;

      try {
        await authClient.signUp.email(
          { ...reqBody, callbackURL: '/' },
          {
            // onRequest: (ctx) => {},
            onSuccess: () => {
              toast.success('yay!');
            },
            onError: () => {
              // {
              //   "code": "PASSWORD_COMPROMISED",
              //   "message": "The password you entered has been compromised. Please choose a different password."
              // }
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
          name="name"
          children={(field) => <field.InputField label="name" />}
        />
        <form.AppField
          name="email"
          children={(field) => <field.InputField label="email" type="email" />}
        />
        <form.AppField
          name="password"
          children={(field) => <field.PasswordField label="password" />}
        />
        <form.AppField
          name="confirm"
          children={(field) => <field.PasswordField label="confirm password" />}
        />

        <form.AppForm>
          <Field>
            <form.SubmitButton label="submit" />
          </Field>
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}
