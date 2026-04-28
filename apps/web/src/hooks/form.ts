import { CheckboxField } from '@/components/form/CheckboxField';
import { InputField } from '@/components/form/InputField';
import { SelectField } from '@/components/form/SelectField';
import { SubmitButton } from '@/components/form/SubmitButton';
import { TextareaField } from '@/components/form/TextareaField';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: { CheckboxField, InputField, SelectField, TextareaField },
  formComponents: { SubmitButton },
  fieldContext,
  formContext,
});
