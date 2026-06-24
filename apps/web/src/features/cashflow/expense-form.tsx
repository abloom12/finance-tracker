import { toast } from 'sonner';
import { z } from 'zod';

import { Field, FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';

const expenseFormSchema = z.object({});

type ExpenseFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
};

export function ExpenseForm(_props: ExpenseFormProps) {
  const form = useAppForm({
    defaultValues: {},
    onSubmit: async () => {
      toast.success('new income added');
    },
    validators: { onChange: expenseFormSchema },
  });

  return (
    <div>
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
            children={(field) => (
              <field.InputField label="What is this expense for?" />
            )}
          />

          <form.AppField
            name="type"
            children={(field) => (
              <field.NativeSelectField
                label="What kind of expense is this?"
                placeholder=""
                options={[
                  { label: 'Credit Card', value: 'credit_card' },
                  { label: 'Rent', value: 'rent' },
                  { label: 'Mortgage', value: 'mortgage' },
                  { label: 'Utility', value: 'utility' },
                  { label: 'Other', value: 'other' },
                ]}
              />
            )}
          />

          <form.AppField
            name="amount"
            children={(field) => (
              <field.CurrencyField label="How much is it?" />
            )}
          />

          <form.AppField
            name="variable"
            children={(field) => (
              <field.CheckboxField label="Does this amount change?" />
            )}
          />

          <form.AppField
            name="paymentDate"
            children={(field) => (
              <field.InputField type="date" label="When is the next payment?" />
            )}
          />

          <form.AppForm>
            <Field>
              <form.SubmitButton label="Save" />
            </Field>
          </form.AppForm>
        </FieldGroup>
      </form>
    </div>
  );
}
