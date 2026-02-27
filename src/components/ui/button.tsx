import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', disabled, children, ...rest }, ref) => {
    const baseClasses =
      'rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors inline-flex items-center justify-center cursor-pointer';

    const variantClasses =
      variant === 'primary'
        ? 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50';

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base font-semibold',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
