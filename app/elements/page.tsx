import './styles.scss';
import StylesSidebar from "@sections/StylesSidebar/StylesSidebar";
import Navigation from '@organisms/Navigation/Navigation';
import { bem } from '@utils/bem';

import { fetchNav } from '@lib/api';

export default async function ElementsPage() {
  const [stylesNav] = await Promise.all([
    fetchNav('styles'),
  ]);
  return (
    <div className={bem({
      block: 'page',
      modifiers: ['elements']
    })}>
      {/* <DomTree></DomTree> */}
      <StylesSidebar>
        <Navigation items={stylesNav} className='pl-[3px]' useUnderline={true}>
        </Navigation>
      </StylesSidebar>
    </div>
  );
}