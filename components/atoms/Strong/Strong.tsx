import { bem } from '@utils/bem';
import './styles.scss';

export interface StrongProps extends React.HTMLAttributes<HTMLElement> {
  modifiers?: string[];
  children?: React.ReactNode;
}

export const Strong = ({
  modifiers = [],
  className = '',
  children,
  ...props
}: StrongProps) => {

  return (
    <strong className={bem(
      {
        block: 'strong',
        modifiers: [...modifiers],
        extra: className
      }
    )} {...props}>
      {children}
    </strong>
  );
};

export default Strong;
