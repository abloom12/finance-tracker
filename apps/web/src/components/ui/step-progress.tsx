import { cn } from '@/lib/cn';

type StepProgressProps = {
  steps: number;
  currentStep: number;
  className?: string;
};

export function StepProgress({
  steps,
  currentStep,
  className,
}: StepProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-valuenow={currentStep}
      aria-label={`Step ${currentStep} of ${steps}`}
      className={cn('flex items-center justify-center gap-3', className)}
    >
      {Array.from({ length: steps }).map((_, index) => {
        const step = index + 1;
        const isActive = step === currentStep;
        const isComplete = step < currentStep;

        return (
          <div
            key={step}
            className={cn(
              'h-1.5 w-11 rounded-full transition-colors',
              'bg-muted/60',
              (isActive || isComplete) &&
                'bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.65)]',
            )}
          />
        );
      })}
    </div>
  );
}
