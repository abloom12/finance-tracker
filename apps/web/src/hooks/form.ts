import { InputField } from '@/components/form/InputField';
import { SubmitButton } from '@/components/form/SubmitButton';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: { InputField },
  formComponents: { SubmitButton },
  fieldContext,
  formContext,
});
