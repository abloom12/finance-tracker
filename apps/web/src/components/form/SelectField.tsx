import { useFieldContext } from '@/hooks/form';
import { useStore } from '@tanstack/react-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/Field';
import { Select, SelectOption } from '../ui/Select';

type SelectFieldProps = {
  label: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  description?: string;
};

function SelectField({
  label,
  options,
  placeholder,
  description,
}: SelectFieldProps) {
  const field = useFieldContext<string>();

  const { errors, isTouched } = useStore(field.store, (state) => state.meta);

  const descriptionId = `${field.name}-description`;
  const errorId = `${field.name}-error`;
  const hasErrors = isTouched && errors.length > 0;

  const describedBy =
    `${description ? descriptionId : ''} ${hasErrors ? errorId : ''}`.trim() ||
    undefined;

  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Select
        id={field.name}
        value={field.state.value}
        aria-invalid={hasErrors}
        aria-describedby={describedBy}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        {placeholder && (
          <SelectOption value="" aria-hidden="true" disabled>
            {placeholder}
          </SelectOption>
        )}
        {options.map((option) => (
          <SelectOption key={option.value} value={option.value}>
            {option.label}
          </SelectOption>
        ))}
      </Select>
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      <FieldError id={errorId} errors={isTouched ? errors : undefined} />
    </Field>
  );
}

export { SelectField };
