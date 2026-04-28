import * as React from 'react';
import { cn } from '@/lib/cn';
import { ChevronDownIcon } from 'lucide-react';

function Select({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      data-slot="select"
      className={cn(
        'select-none',
        'h-8 w-full min-w-0 py-1 pr-8 pl-2.5 text-sm',
        'border-input rounded-lg border outline-none',
        'placeholder:text-muted-foreground bg-transparent transition-colors',
        'selection:bg-primary selection:text-primary-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'disabled:pointer-events-none disabled:cursor-not-allowed',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
        'data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5',
        'dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  );
}
function SelectOption({ className, ...props }: React.ComponentProps<'option'>) {
  return (
    <option
      data-slot="select-option"
      className={cn('', className)}
      {...props}
    />
  );
}
function SelectOptGroup({
  className,
  ...props
}: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="select-optgroup"
      className={cn('', className)}
      {...props}
    />
  );
}

// Custom Select from Shadcn Ui
function CustomSelect({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <div
      className={cn(
        'group/native-select relative w-fit has-[select:disabled]:opacity-50',
        className,
      )}
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          'appearance-none select-none',
          'h-8 w-full min-w-0 py-1 pr-8 pl-2.5 text-sm',
          'border-input rounded-lg border outline-none',
          'placeholder:text-muted-foreground bg-transparent transition-colors',
          'selection:bg-primary selection:text-primary-foreground',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
          'disabled:pointer-events-none disabled:cursor-not-allowed',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
          'dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          className,
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}
function CustomSelectOption({
  className,
  ...props
}: React.ComponentProps<'option'>) {
  return (
    <option
      data-slot="native-select-option"
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  );
}
function CustomSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn('bg-[Canvas] text-[CanvasText]', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectOption,
  SelectOptGroup,
  CustomSelect,
  CustomSelectOption,
  CustomSelectOptGroup,
};
