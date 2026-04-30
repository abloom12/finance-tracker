import { useFormContext } from '@/hooks/form';
import { Button } from '../ui/button-tmp';
import { Spinner } from '../ui/Spinner';

function SubmitButton({
  label,
  loadingLabel,
}: {
  label: string;
  loadingLabel?: string;
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button type="submit" aria-busy={isSubmitting} disabled={!canSubmit}>
          {isSubmitting && <Spinner className="size-4" />}
          {isSubmitting ? (loadingLabel ?? label) : label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export { SubmitButton };
