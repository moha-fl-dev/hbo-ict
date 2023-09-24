import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';
import { cn } from '../utils';
import Link from 'next/link';

const LogoVariants = cva('text-slate-700 uppercase inline', {
  variants: {
    variant: {
      default: 'text-2xl font-bold',
      small: 'text-xl font-medium',
    },
    size: {
      default: 'text-2xl',
      small: 'text-xl ',
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
}

const Logo: FC<LogoProps> = ({
  className,
  variant,
  size,
  asLink,
  ...props
}) => {
  if (asLink) {
    return (
      <Link href="/">
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
