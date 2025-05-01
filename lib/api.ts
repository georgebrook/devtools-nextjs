import type { NavItem } from '@organisms/Navigation/Navigation';

import mainNavData from './mock-data/main-nav.json' assert { type: 'json' };
import toolsNavData from './mock-data/tools-nav.json' assert { type: 'json' };
import optionsNavData from './mock-data/options-nav.json' assert { type: 'json' };

type NavType = 'main' | 'tools' | 'options';

const navDataMap: Record<NavType, NavItem[]> = {
  main: mainNavData as NavItem[],
  tools: toolsNavData as NavItem[],
  options: optionsNavData as NavItem[],
};

export const fetchNav = (type: NavType): Promise<NavItem[]> => {
  return Promise.resolve(navDataMap[type]);
}
