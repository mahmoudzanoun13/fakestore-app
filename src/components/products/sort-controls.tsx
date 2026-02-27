import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { Select } from '@/components/ui/select';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';

type SortControlsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export const SortControls = forwardRef<HTMLDivElement, SortControlsProps>(
  ({ value, onChange, className = '', ...rest }, ref) => {
    const options = [
      { value: 'default', label: 'Recommended' },
      { value: 'price-asc', label: 'Price: Low to High' },
      { value: 'price-desc', label: 'Price: High to Low' },
      { value: 'rating-desc', label: 'Top Rated' },
    ];

    return (
      <div
        ref={ref}
        className={`flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto ${className}`}
        {...rest}
      >
        <span className="text-sm font-semibold text-muted whitespace-nowrap">Sort by:</span>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          options={options}
          className="w-[200px] sm:w-[180px]"
        />
      </div>
    );
  }
);

SortControls.displayName = 'SortControls';
