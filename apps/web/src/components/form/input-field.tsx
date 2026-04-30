import { useStore } from '@tanstack/react-form';

import { useFieldContext } from '@/hooks/form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'date'
  | 'time'
  | 'tel'
  | 'url'
  | 'search';

function InputField({
  type = 'text',
  label,
  description,
}: {
  type?: InputType;
  label: string;
  description?: string;
}) {
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
      <Input
        type={type}
        id={field.name}
        value={field.state.value}
        aria-invalid={hasErrors}
        aria-describedby={describedBy}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      <FieldError id={errorId} errors={isTouched ? errors : undefined} />
    </Field>
  );
}

export { InputField };
