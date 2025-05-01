import { bem } from '@utils/bem';
import './styles.scss';

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  modifiers?: string[];
  children?: React.ReactNode;
}

export const Paragraph = ({
  modifiers = [],
  className,
  children,
  ...props
}: ParagraphProps) => {
  return (
    <p className={bem(
      {
        block: 'paragraph',
        modifiers: [...modifiers],
        extra: `${className || ''}`
      }
    )} {...props}>
      {children}
    </p>
  );
};


Paragraph.displayName = 'Paragraph';

export default Paragraph;
