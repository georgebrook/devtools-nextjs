import { bem } from '@utils/bem';
import './styles.scss';

export interface PipeProps extends React.HTMLAttributes<HTMLDivElement> {
  modifiers?: string[];
  className?: string;
}

export const Pipe = ({
  modifiers = [],
  className,
  ...props
}: PipeProps) => {
  return (
    <div
      className={bem({
        block: 'pipe',
        modifiers,
        extra: className || 'flex h-full items-center',
      })}
      {...props}
    >
      <span
        className={bem({
          block: 'pipe',
          element: 'line',
          extra: className || '',
        })}
      />
    </div>
  );
};

Pipe.displayName = 'Pipe';

export default Pipe;
