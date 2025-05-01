import { bem } from '@utils/bem';
import './styles.scss';

export interface StylesSideBarProps {
  modifiers?: string[];
  children?: React.ReactNode;
  className?: string;
}

const StylesSidebar = ({
  modifiers = [],
  children,
  className
}: StylesSideBarProps) => {
  return (
    <aside
      className={bem({
        block: 'styles-sidebar',
        modifiers: [...modifiers],
        extra: `${className || ''}`,
      })}
    >
      {children}
    </aside>
  );
};

StylesSidebar.displayName = 'StylesSidebar';

export default StylesSidebar;
