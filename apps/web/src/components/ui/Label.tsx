import * as React from 'react';
import { cn } from '@/lib/cn';
import { Label as LabelPrimitive } from 'radix-ui';

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot='label'
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium capitalize select-none',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
