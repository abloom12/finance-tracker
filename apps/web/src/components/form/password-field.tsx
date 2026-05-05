import { useState } from 'react';
import { useStore } from '@tanstack/react-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { useFieldContext } from '@/lib/form';
import { Field, FieldDescription, FieldError, FieldLabel } from '../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

function PasswordField({
  label,
  description,
}: {
  label: string;
  description?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

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
      <InputGroup>
        <InputGroupInput
          type={showPassword ? 'text' : 'password'}
          id={field.name}
          value={field.state.value}
          aria-invalid={hasErrors}
          aria-describedby={describedBy}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
        <InputGroupAddon
          align="inline-end"
          className="cursor-pointer"
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ?
            <EyeOffIcon />
          : <EyeIcon />}
        </InputGroupAddon>
      </InputGroup>

      {description && (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      )}
      <FieldError id={errorId} errors={isTouched ? errors : undefined} />
    </Field>
  );
}

export { PasswordField };
