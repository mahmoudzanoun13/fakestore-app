import { forwardRef } from 'react';
import { Select } from '@/components/ui/select';

type CategoryFilterProps = {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  className?: string;
};

export const CategoryFilter = forwardRef<HTMLDivElement, CategoryFilterProps>(
  ({ value, onChange, categories, className = '' }, ref) => {
    const options = [
      { value: 'all', label: 'All Categories' },
      ...categories.map((cat) => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ];

    return (
      <div
        ref={ref}
        className={`flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto ${className}`}
      >
        <span className="text-sm font-semibold text-muted whitespace-nowrap">Filter by:</span>
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          options={options}
          className="w-[200px] sm:w-[180px]"
        />
      </div>
    );
  }
);

CategoryFilter.displayName = 'CategoryFilter';
