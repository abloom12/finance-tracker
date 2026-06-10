import { toast } from 'sonner';
import { z } from 'zod';

import { Field, FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';

export function IncomeForm() {
  const form = useAppForm({});

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
            name="amount"
            children={(field) => (
              <field.InputField type="number" label="Amount" />
            )}
          />

          <form.AppField
            name="frequency"
            children={(field) => (
              <field.SelectField
                label="Frequency"
                groupLabel="choose a frequncy"
                placeholder="how often do you get paid?"
                options={[
                  { label: 'Weekly', value: 'weekly' },
                  { label: 'Biweekly', value: 'biweekly' },
                ]}
              />
            )}
          />

          <form.AppField
            name="frequency2"
            children={(field) => (
              <field.NativeSelectField
                label="Frequency2"
                placeholder="how often do you get paid?"
                options={[
                  { label: 'Weekly', value: 'weekly' },
                  { label: 'Biweekly', value: 'biweekly' },
                ]}
              />
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
