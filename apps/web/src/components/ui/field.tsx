import type { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';
import { Label } from './label';

const fieldVariants = cva(
  'group/field data-[invalid=true]:text-destructive flex w-full gap-2',
  {
    variants: {
      orientation: {
        vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
        horizontal: [
          'flex-row items-center',
          '*:data-[slot=field-label]:flex-auto',
          'has-[>[data-slot=field-content]]:items-start',
          'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
        responsive: [
          'flex-col *:w-full',
          '[&>.sr-only]:w-auto',
          '@md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
      },
    },
    defaultVariants: { orientation: 'vertical' },
  },
);

// The core wrapper for a single field. Provides orientation control, invalid state styling, and spacing.
function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

// Label styled for both direct inputs and nested Field children.
function FieldLabel({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label',
        'flex w-fit gap-2',
        'leading-snug',
        'group-data-[disabled=true]/field:opacity-50',
        '*:data-[slot=field]:p-2.5',
        'has-data-checked:border-primary/30 has-data-checked:bg-primary/5',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border',
        'dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10',
        className,
      )}
      {...props}
    />
  );
}

// Layout wrapper that stacks Field components and enables container queries for responsive orientations.
function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group',
        'flex w-full flex-col gap-5',
        'data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className,
      )}
      {...props}
    />
  );
}

// Flex column that groups control and descriptions when the label sits beside the control. Not required if you have no description.
function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content',
        'flex flex-1 flex-col gap-0.5 leading-snug',
        className,
      )}
      {...props}
    />
  );
}

// Helper text slot that automatically balances long lines in horizontal layouts.
function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-muted-foreground text-left text-sm leading-normal font-normal',
        'last:mt-0 nth-last-2:-mt-1',
        'group-has-data-horizontal/field:text-balance',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        '[[data-variant=legend]+&]:-mt-1.5',
        className,
      )}
      {...props}
    />
  );
}

// Accessible error container that accepts children or an errors array (from TanStack Form + Zod).
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & { errors?: Array<string | undefined> }) {
  const content = React.useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;

    const uniqueErrors = [...new Set(errors.filter(Boolean))];

    if (uniqueErrors.length === 1) return uniqueErrors[0];

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  );
}

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  );
}
function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
        className,
      )}
      {...props}
    />
  );
}

export {
  Field,
  FieldLabel,
  FieldGroup,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
};
