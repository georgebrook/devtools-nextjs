'use client';

import { bem } from '@utils/bem';
import Icon from '@atoms/Icon/Icon';
import './styles.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: string;
  iconPosition?: 'before' | 'after' | 'only';
  iconSize?: number;
  modifiers?: string[];
}

export const Button = ({
  icon,
  iconPosition = 'before',
  iconSize,
  text,
  modifiers = [],
  className,
  ...props
}: ButtonProps) => {
  const iconOnly = iconPosition === 'only';

  const classNames = bem({
    block: 'button',
    modifiers: [icon ? 'icon' : '', iconOnly ? 'icon-only' : '', ...modifiers],
    extra: `${className || ''} ${iconOnly ? 'flex aspect-square justify-center' : ''}`,
  });

  return (
    <button
      aria-label={text}
      className={classNames}
      {...props}
    >
      {icon && iconPosition !== 'after' && (
        <Icon
          name={icon}
          size={iconSize}
          className={bem({ block: 'button', element: 'icon' })}
        />
      )}

      {iconOnly ? (
        <span className="sr-only">{text}</span>
      ) : (
        <span className={bem({ block: 'button', element: 'text' })}>{text}</span>
      )}

      {icon && iconPosition === 'after' && (
        <Icon
          name={icon}
          size={iconSize}
          className={bem({ block: 'button', element: 'icon' })}
        />
      )}

    </button>
  );
};

Button.displayName = 'Button'

export default Button;
