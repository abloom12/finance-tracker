import { useFormContext } from '@/hooks/form';

import { Button } from '../shadcn/button';
import { Spinner } from '../shadcn/spinner';

function SubmitButton({
  label,
  loadingLabel,
}: {
  label: string;
  loadingLabel?: string;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type='submit' aria-busy={isSubmitting} disabled={isSubmitting}>
          {isSubmitting && <Spinner className='size-4' />}
          {isSubmitting ? (loadingLabel ?? label) : label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export { SubmitButton };
