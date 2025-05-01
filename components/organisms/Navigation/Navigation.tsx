'use client';

import { useEffect, useState, useRef } from 'react';
import { bem } from '@utils/bem';
import Link from 'next/link';
import Button from 'components/molecules/Button/Button';
import { usePathname } from 'next/navigation';
import './styles.scss';

export type NavItem = {
  label: string;
  href?: string;
  isActive?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  iconName?: string;
  iconPosition?: 'before' | 'after' | 'only';
  iconSize?: number;
};

type NavigationProps = {
  items: NavItem[];
  modifiers?: string[];
  className?: string;
  useUnderline?: boolean;
};

export const Navigation = ({
  items,
  modifiers = [],
  className = 'font-medium text-base h-[35px]',
  useUnderline = false,
}: NavigationProps) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const underlineStyleRef = useRef<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    if (!useUnderline || !navRef.current) return;

    const activeIdx = items.findIndex((item) => item.href === pathname);
    setActiveIndex(activeIdx >= 0 ? activeIdx : null);

    const updateUnderline = () => {
      const listItems = navRef.current?.querySelectorAll(`.navigation__item`);
      const element = listItems?.[activeIdx] as HTMLElement;
      if (element) {
        underlineStyleRef.current = {
          left: element.offsetLeft,
          width: element.offsetWidth,
        };
      }
    };

    updateUnderline();

    window.addEventListener('resize', updateUnderline);
    console.log(navRef);

    return () => {
      window.removeEventListener('resize', updateUnderline);
    };
  }, [pathname]);

  return (
    <nav className={bem({
      block: 'navigation',
      modifiers,
      extra: `font-medium text-base h-[35px] ${className || ''}`,
    })} ref={navRef}>
      <ul className={'navigation__list flex row h-full relative'}>
        {items.map((item, index) => (
          (item.href || item.iconName) && (
            <li
              key={index}
              className={bem({
                block: 'navigation',
                element: 'item',
                extra: 'h-full',
              })}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  target={item.target}
                  className={bem({
                    block: 'navigation',
                    element: 'link',
                    modifiers: [activeIndex === index ? 'active' : ''],
                    extra: 'h-full flex items-center',
                  })}
                >
                  <span>{item.label}</span>
                </Link>
              ) : item.iconName ? (
                <Button
                  icon={item.iconName}
                  className="h-full flex items-center"
                  iconPosition={item.iconPosition || 'before'}
                  iconSize={item.iconSize}
                  text={item.label}
                />
              ) : null}
            </li>
          )
        ))}
      </ul>

      {useUnderline && activeIndex !== null && (
        <div
          className={bem({
            block: 'navigation',
            element: 'underline',
            extra: 'absolute bottom-0 transition-all duration-300 ease-in-out',
          })}
          style={{
            left: `${underlineStyleRef.current.left}px`,
            width: `${underlineStyleRef.current.width}px`,
          }}
        />
      )}
    </nav>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
