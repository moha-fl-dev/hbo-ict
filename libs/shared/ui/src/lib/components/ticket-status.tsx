import { TicketStatusEnum } from '@hbo-ict/lingo/types';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { cn } from '../utils';
import { CheckIcon } from '@radix-ui/react-icons';

const statusBarVariants = cva(
  'md:w-1/4 w-1/6 flex flex-row content-center items-center justify-center md:text-base text-sm',
  {
    variants: {
      variant: {
        active:
          'border border-green-700 bg-green-700 text-white shadow-md rounded-full',
        inactive: 'text-foreground/80',
      },
    },
    defaultVariants: {
      variant: 'active',
    },
  },
);

interface StatusBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBarVariants> {
  activeStatus: TicketStatusEnum;
}

const TicketStatusBar = React.forwardRef<HTMLDivElement, StatusBarProps>(
  (
    { className, activeStatus = TicketStatusEnum.OPEN, variant, ...props },
    ref,
  ) => {
    const statusses = Object.values(TicketStatusEnum);

    function isStatusPassed(status: TicketStatusEnum) {
      return statusses.indexOf(status) < statusses.indexOf(activeStatus);
    }

    return (
      <div className="container" ref={ref}>
        <div className="flex flex-row justify-between items-center bg-slate-100/80 rounded-full">
          {statusses.map((status) => {
            return (
              <div
                key={status}
                className={cn(
                  statusBarVariants({
                    variant: status === activeStatus ? variant : 'inactive',
                    className,
                  }),
                )}
                {...props}
              >
                <span className="flex flex-row gap-1 items-center">
                  {status} {isStatusPassed(status) && <CheckIcon />}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
TicketStatusBar.displayName = 'TicketStatusBar';

export { TicketStatusBar };
