'use client';

import { useRef, useEffect } from 'react';
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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current || !sidebarRef.current) return;

      const newWidth = sidebarRef.current.getBoundingClientRect().right - e.clientX;
      if (newWidth > 200) {
        sidebarRef.current.style.width = `${newWidth}px`;
      }
    };

    const stopResize = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopResize);
    };

    const startResize = () => {
      isResizing.current = true;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', stopResize);
    };

    const handle = sidebarRef.current?.querySelector('.styles-sidebar__resize-handle');
    handle?.addEventListener('mousedown', startResize);

    return () => {
      handle?.removeEventListener('mousedown', startResize);
      stopResize();
    };
  }, []);

  return (
    <aside
      className={bem({
        block: 'styles-sidebar',
        modifiers: [...modifiers],
        extra: `${className || ''}`,
      })}
      ref={sidebarRef}
    >
      <div className={bem({
        block: 'styles-sidebar',
        element: 'resize-handle'
      })} />
      {children}
    </aside>
  );
};

StylesSidebar.displayName = 'StylesSidebar';

export default StylesSidebar;
