import { toast } from 'sonner';

import { Field, FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';
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
        toast.error(
          'There was an issue with the server, please try again later.',
        );
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
          children={(field) => <field.InputField label="Name" />}
        />
        <form.AppField
          name="email"
          children={(field) => <field.InputField label="Email" type="email" />}
        />
        <form.AppField
          name="password"
          children={(field) => <field.PasswordField label="Password" />}
        />
        <form.AppField
          name="confirm"
          children={(field) => <field.PasswordField label="Confirm Password" />}
        />

        <form.AppForm>
          <Field>
            <form.SubmitButton label="Create Account" />
          </Field>
        </form.AppForm>
      </FieldGroup>
    </form>
  );
}
