import { bem } from '@utils/bem';
import './styles.scss';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  text?: string;
  modifiers?: string[];
}

export const Label = ({
  text,
  modifiers = [],
  className,
  ...props
}: LabelProps) => {
  const classNames = bem(
    {
      block: 'label',
      modifiers: [...modifiers],
      extra: `${className || ''}`
    }
  );

  return (
    <label className={classNames} {...props}>
      {text}
    </label>
  );
};

Label.displayName = 'Label';

export default Label;
