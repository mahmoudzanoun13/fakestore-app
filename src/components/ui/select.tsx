import { forwardRef, useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  error?: string;
  options?: Option[];
  value?: string | number;
  onChange?: (e: { target: { value: string } }) => void;
  placeholder?: string;
  className?: string;
  id?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      value,
      onChange,
      placeholder = 'Select an option',
      className = '',
      id,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync local selected option
    const selectedOption = options?.find((opt) => String(opt.value) === String(value));

    // Close on click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string | number) => {
      // Create a mock event for react-hook-form / standard onChange
      onChange?.({ target: { value: val.toString() } } as React.ChangeEvent<HTMLSelectElement>);
      setIsOpen(false);
    };

    const baseClasses =
      'flex w-full items-center justify-between rounded border transition-all duration-200 px-3 py-2 cursor-pointer bg-white min-h-[42px]';
    const errorClasses = error
      ? 'border-error ring-1 ring-error'
      : 'border-border hover:border-primary';

    return (
      <div ref={containerRef} className={`flex flex-col gap-1 relative ${className}`}>
        {label && (
          <label
            className="text-sm font-medium text-secondary-foreground cursor-pointer w-fit"
            onClick={() => setIsOpen(!isOpen)}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Hidden native select for Form integration (RHF, etc.) */}
          <select
            ref={ref}
            value={value}
            onChange={onChange}
            className="sr-only"
            id={id}
            tabIndex={-1}
            {...rest}
          >
            <option value="">{placeholder}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Custom UI Trigger */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`${baseClasses} ${errorClasses} ${isOpen ? 'ring-2 ring-primary/20 border-primary shadow-sm' : ''}`}
          >
            <span
              className={`text-sm tracking-tight ${!selectedOption ? 'text-muted' : 'text-secondary-foreground font-medium'}`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              size={18}
              className={`text-muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
            />
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <div className="absolute z-100 mt-1.5 w-full bg-white border border-border rounded-lg shadow-xl py-1.5 animate-in fade-in zoom-in-95 duration-200 origin-top overflow-hidden">
              <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
                {options?.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-muted italic text-center">
                    No options available
                  </div>
                ) : (
                  options?.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={opt.disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(opt.value);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        String(opt.value) === String(value)
                          ? 'bg-primary/10 text-primary font-bold'
                          : 'text-secondary-foreground hover:bg-secondary'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs text-error mt-0.5 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
