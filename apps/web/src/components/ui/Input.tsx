import * as React from 'react';
import { cn } from '@/lib/cn';

function Input({ type, className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border bg-transparent shadow-xs transition-colors outline-none',
        'h-9 w-full min-w-0 rounded-md px-3 py-1 text-base',
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm',
        'placeholder:text-muted-foreground selection:bg-primary',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
