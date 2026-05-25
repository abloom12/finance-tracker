import { toast } from 'sonner';

import { Field, FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useAppForm } from '@/lib/form';
import type { SignupSchema } from './schemas';
import { signupSchema } from './schemas';

type SignUpFormProps = { onSuccess: () => void | Promise<void> };

export function SignupForm({ onSuccess }: SignUpFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    } as SignupSchema,
    validators: { onChange: signupSchema },
    onSubmit: async ({ value }) => {
      const { data, error } = await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      await onSuccess();
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
