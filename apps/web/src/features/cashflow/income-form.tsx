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
  schedule: z.object({
    weekday: z.string(),
    firstDayOfMonth: z.string(),
    secondDayOfMonth: z.string(),
    paymentDate: z.string(),
  }),
});

type IncomeFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
};

//! need to think about the schedule value, idk if i like it

export function IncomeForm(_props: IncomeFormProps) {
  const form = useAppForm({
    defaultValues: {
      name: '',
      type: '',
      amount: '',
      variable: false,
      frequency: '',
      schedule: {
        weekday: '',
        firstDayOfMonth: '',
        secondDayOfMonth: '',
        paymentDate: '',
      },
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
                        name="schedule.weekday"
                        children={(field) => (
                          <field.NativeSelectField
                            label="Payday"
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

                    {frequency === 'semi_month' && (
                      <>
                        <form.AppField
                          name="schedule.firstDayOfMonth"
                          children={(field) => (
                            <field.InputField
                              type="number"
                              label="First payday"
                            />
                          )}
                        />
                        <form.AppField
                          name="schedule.secondDayOfMonth"
                          children={(field) => (
                            <field.InputField
                              type="number"
                              label="Second payday"
                            />
                          )}
                        />
                      </>
                    )}

                    {(frequency === 'one_time' ||
                      frequency === 'bi_week' ||
                      frequency === 'month' ||
                      frequency === 'quarter' ||
                      frequency === 'yearly') && (
                      <form.AppField
                        name="schedule.paymentDate"
                        children={(field) => (
                          <field.InputField type="date" label="Next payday" />
                        )}
                      />
                    )}
                  </>
                );
              }}
            />
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
