import { forwardRef, type ReactNode } from 'react';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  rightElement?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className = '', ...rest }, ref) => {
    const baseClasses =
      'block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-shadow';
    const errorClasses = error ? 'border-error text-error focus:ring-error' : 'border-border';

    return (
      <div className={className}>
        {label && (
          <label
            className="block mb-1 text-sm font-medium text-secondary-foreground cursor-pointer"
            htmlFor={rest.id}
          >
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={`${baseClasses} ${errorClasses} ${rightElement ? 'pr-10' : ''}`}
            {...rest}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
