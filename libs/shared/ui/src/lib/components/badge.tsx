import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        LOW: 'border-transparent bg-green-500 text-primary-foreground ',

        HIGH: 'border-transparent bg-destructive text-destructive-foreground ',
        MEDIUM: 'text-foreground bg-secondary',
      },
    },
    defaultVariants: {
      variant: 'LOW',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
