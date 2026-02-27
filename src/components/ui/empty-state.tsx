import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  message?: string;
  children?: ReactNode;
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ message = 'No data available.', children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center p-8 text-muted ${className}`}
        {...rest}
      >
        {children}
        <p className="mt-2 text-center text-sm">{message}</p>
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
