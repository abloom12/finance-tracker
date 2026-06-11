import { toast } from 'sonner';
import { z } from 'zod';

import { Field, FieldGroup, FieldSeparator } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';

const incomeFormSchema = z.object({
  name: z.string(),
  type: z.string(),
  amount: z.string(),
  variable: z.boolean(),
  frequency: z.string(),
  weekday: z.string(),
  dayOfMonth: z.string(),
  paymentDate: z.string(),
});

type IncomeFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
};

export function IncomeForm(_props: IncomeFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: '',
      type: '',
      amount: '',
      variable: false,
      frequency: '',
      weekday: '',
      dayOfMonth: '',
      paymentDate: '',
    },
    onSubmit: async () => {
      toast.success('new income added');
    },
    validators: { onChange: incomeFormSchema },
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
          <FieldGroup>
            <form.AppField
              name="name"
              children={(field) => <field.InputField label="Name" />}
            />

            <form.AppField
              name="type"
              children={(field) => (
                <field.NativeSelectField
                  label="Type"
                  placeholder=""
                  options={[
                    { label: 'Salary', value: 'salary' },
                    { label: 'Freelance', value: 'freelance' },
                    { label: 'Pension', value: 'pension' },
                    { label: 'Child Support', value: 'child_support' },
                    { label: 'Other', value: 'other' },
                  ]}
                />
              )}
            />

            <form.AppField
              name="amount"
              children={(field) => <field.CurrencyField label="Amount" />}
            />

            <form.AppField
              name="variable"
              children={(field) => (
                <field.CheckboxField label="Does this amount change?" />
              )}
            />

            {/* if variable gets checked we want to show min and max amout fields */}
          </FieldGroup>

          <FieldSeparator />

          <FieldGroup>
            <form.AppField
              name="frequency"
              children={(field) => (
                <field.NativeSelectField
                  label="Frequency"
                  placeholder="how often do you get paid?"
                  options={[
                    { label: 'Every week', value: 'week' },
                    { label: 'Every 2 weeks', value: 'bi_week' },
                    { label: 'Twice a month', value: 'semi_month' },
                    { label: 'Every Month', value: 'month' },
                    { label: 'Every 3 months', value: 'quarter' },
                    { label: 'Once a year', value: 'yearly' },
                    { label: 'One-Time', value: 'one_time' },
                    { label: 'Irregular / varies', value: 'irregular' },
                  ]}
                />
              )}
            />

            <form.Subscribe
              selector={(state) => state.values.frequency}
              children={(frequency) => {
                return (
                  <>
                    {frequency === 'week' && (
                      <form.AppField
                        name="weekday"
                        children={(field) => (
                          <field.NativeSelectField
                            label="Pay day"
                            options={[
                              { label: 'Monday', value: 'monday' },
                              { label: 'Tuesday', value: 'tuesday' },
                              { label: 'Wednesday', value: 'wednesday' },
                              { label: 'Thursday', value: 'thursday' },
                              { label: 'Friday', value: 'friday' },
                              { label: 'Saturday', value: 'saturday' },
                              { label: 'Sunday', value: 'sunday' },
                            ]}
                          />
                        )}
                      />
                    )}

                    {frequency === 'month' && (
                      <form.AppField
                        name="dayOfMonth"
                        children={(field) => (
                          <field.InputField
                            type="number"
                            label="Day of month"
                          />
                        )}
                      />
                    )}

                    {frequency === 'one_time' && (
                      <form.AppField
                        name="paymentDate"
                        children={(field) => (
                          <field.InputField type="date" label="Payment date" />
                        )}
                      />
                    )}
                  </>
                );
              }}
            />

            {/* based off the frequency selected we will show the appropriate date field(s) */}
          </FieldGroup>

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
