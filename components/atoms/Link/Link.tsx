import NextLink from 'next/link';
import { bem } from '@utils/bem';
import './styles.scss';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  modifiers?: string[];
  children: React.ReactNode;
}

const isInternalLink = (href: string) => href.startsWith('/') || href.startsWith('#');

export const Link = ({
  href,
  children,
  modifiers = [],
  className,
  ...props
}: LinkProps) => {
  const classNames = bem(
    {
      block: 'link',
      modifiers: [...modifiers],
      extra: `${className || ''}`
    }
  );

  if (isInternalLink(href)) {
    return (
      <NextLink href={href} className={classNames} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} className={classNames} {...props} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
};

Link.displayName = 'Link';

export default Link;
