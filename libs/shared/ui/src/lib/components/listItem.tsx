import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils';
import React from 'react';

const ListItemVariants = cva('text-sm font-medium w-full  transition-colors ', {
  variants: {
    variant: {
      default: 'text-secondary-foreground hover:text-workspace-foreground ',

      active: 'bg-workspace-secondary  text-workspace-foreground',
    },
    size: {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8',
      icon: 'h-9 w-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface ListItemProps
  extends React.LiHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof ListItemVariants> {}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <li
        className={cn(ListItemVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

ListItem.displayName = 'ListItem';

export { ListItem, ListItemProps };
