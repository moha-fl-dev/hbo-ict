import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { FC } from 'react';
import { cn } from '../utils';
import Link from 'next/link';

const LogoVariants = cva('text-slate-700 uppercase inline-flex', {
  variants: {
    variant: {
      default: 'text-2xl font-bold',
      small: 'text-xl font-medium',
    },
    size: {
      default: 'text-2xl',
      small: 'text-xl ',
      extraSmall: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface LogoProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof LogoVariants> {
  asLink?: boolean;
  path?: string;
}

const Logo: FC<LogoProps> = ({
  className,
  variant,
  size,
  asLink,
  path,
  ...props
}) => {
  if (asLink) {
    return (
      <Link href={path || '/'}>
        <h1
          className={cn(LogoVariants({ variant, size, className }))}
          {...props}
        >
          Acme Inc.
        </h1>
      </Link>
    );
  }

  return (
    <h1 className={cn(LogoVariants({ variant, size, className }))} {...props}>
      Acme Inc.
    </h1>
  );
};
Logo.displayName = 'Logo';
export { Logo };
