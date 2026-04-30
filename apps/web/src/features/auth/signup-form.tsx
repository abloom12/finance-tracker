import { toast } from 'sonner';

import { Field, FieldGroup } from '@/components/ui/field-t';
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

      // const a = authClient.useSession();

      const { data, error } = await authClient.signUp.email(
        { ...reqBody, callbackURL: '/' },
        {
          // onRequest: (ctx) => {
          //   // show loading
          // },
          onSuccess: () => {
            toast.success('yay!');
          },
          onError: () => {
            // show error message
            toast.error('uh oh');
          },
        },
      );

      console.log({ data, error });
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
          children={(field) => (
            <field.InputField label="password" type="password" />
          )}
        />
        <form.AppField
          name="confirm"
          children={(field) => (
            <field.InputField label="confirm password" type="password" />
          )}
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
