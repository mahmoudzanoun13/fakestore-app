import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

type ErrorMessageProps = HTMLAttributes<HTMLDivElement> & {
  message?: string;
};

export const ErrorMessage = forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ message, children, className = '', ...rest }, ref) => {
    const content = message ?? children;
    return (
      <div
        ref={ref}
        role="alert"
        className={`text-error bg-error/10 border border-error rounded p-2 ${className}`}
        {...rest}
      >
        {content}
      </div>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';
