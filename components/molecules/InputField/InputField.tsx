import React from 'react';
import { bem } from '@utils/bem';
import Label from 'components/atoms/Label/Label';
import './styles.scss';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  modifiers?: string[];
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  modifiers = [],
  className,
  ...props
}) => {
  const classes = bem(
    {
      block: 'input',
      modifiers: [...modifiers],
      extra: `p-4 border border-gray-800 rounded-lg ${className}`
    }
  );

  const errorClasses = bem(
    { block: 'input', element: 'error-message', modifiers: error ? ['visible'] : [] }
  );

  return (
    <div className={classes}>
      {label && <Label text={label} />}
      
      <input {...props} />
      
      {error && (
        <div className={errorClasses}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
