import { JSX } from 'react';
import { bem } from '@utils/bem';
import './styles.scss';

export interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  modifiers?: string[];
  children: React.ReactNode;
  className?: string;
}

const Heading = ({
  level,
  modifiers = [],
  children,
  className
}: HeadingProps) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag
      className={bem({
        block: 'heading',
        modifiers: [`h${level}`, ...modifiers],
        extra: `${className || ''}`,
      })}
    >
      {children}
    </HeadingTag>
  );
};

Heading.displayName = 'Heading';

export default Heading;
