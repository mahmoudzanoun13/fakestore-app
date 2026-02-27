import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

type ProductGridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const ProductGrid = forwardRef<HTMLDivElement, ProductGridProps>(
  ({ children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

ProductGrid.displayName = 'ProductGrid';
