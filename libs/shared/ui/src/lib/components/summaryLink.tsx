import type { LinkProps } from 'next/link';
import Link from 'next/link';
import React from 'react';

interface SummaryLinksProps extends LinkProps {
  icon: React.ReactElement;
  label: string;
  min: number;
  max: number;
}

export function SummaryLink({
  icon,
  label,
  min,
  max,

  ...rest
}: SummaryLinksProps) {
  const styledIcon = React.cloneElement(icon as React.ReactElement, {
    className: 'text-black group-hover:text-white',
    fontSize: 10,
  });
  return (
    <Link
      className="bg-workspace-secondary transition-colors rounded-sm p-2 hover:bg-workspace-primary group"
      {...rest}
    >
      <div className="flex flex-row align-middle items-center justify-center gap-2 ">
        {styledIcon}
        <div className="flex flex-col gap-1">
          <span className="text-black text-xs group-hover:text-white">
            {Math.floor(Math.random() * min) + max}
          </span>
          <span className="text-black text-xs group-hover:text-white">
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}
