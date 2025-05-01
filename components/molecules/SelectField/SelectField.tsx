import React from 'react';
import { bem } from '@utils/bem';
import Label from 'components/atoms/Label/Label';
import './styles.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  hideLabel?: boolean;
  options: SelectOption[];
  modifiers?: string[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  hideLabel,
  className,
  options,
  modifiers = [],
  ...props
}) => {
  const classNames = bem({
    block: 'select',
    modifiers,
    extra: `p-4 ${className}`
  });

  const errorClasses = bem(
    { block: 'select', element: 'error-message', modifiers: error ? ['visible'] : [] }
  );

  return (
    <div className={classNames}>

      {label && <Label className={hideLabel ? 'sr-only': ''} text={label} />}

      <select {...props}>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {error && (
        <div className={errorClasses}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
