import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

type SpinnerProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg';
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', className = '', ...rest }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    }[size];
    return (
      <div
        ref={ref}
        role="status"
        className={`${sizeClasses} border-2 border-primary border-t-transparent rounded-full animate-spin ${className}`}
        {...rest}
      />
    );
  }
);

Spinner.displayName = 'Spinner';
