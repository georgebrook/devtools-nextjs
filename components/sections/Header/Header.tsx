import { bem } from '@utils/bem';
import './styles.scss';

import Navigation from '@organisms/Navigation/Navigation';
import Pipe from '@atoms/Pipe/Pipe';

import type { NavItem } from '@organisms/Navigation/Navigation';

type HeaderProps = {
  modifiers?: string[];
  className?: string;
  isActive?: boolean;
  defaultActive?: boolean;
  mainNavItems: NavItem[];
  toolsNavItems: NavItem[];
  optionsNavItems: NavItem[];
};

export const Header = ({
  modifiers = [],
  className,
  mainNavItems,
  toolsNavItems,
  optionsNavItems,
}: HeaderProps) => {

  return (
    <header className={bem({
      block: 'header',
      modifiers: [...modifiers],
      extra: `flex flex-row items-center mt-[500px] h-[35px] ${className || ''}`,
    })}>
      <Navigation items={toolsNavItems} className='pl-[3px]' modifiers={['icons']}>
      </Navigation>
      <Pipe></Pipe>
      <Navigation useUnderline={true} items={mainNavItems} className='grow'>
      </Navigation>
      <div className='flex h-full'>
        <Pipe></Pipe>
        <Navigation items={optionsNavItems} modifiers={['icons']} className='pr-[6px] inline-block'>
        </Navigation>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
