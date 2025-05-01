import React from 'react';
import { bem } from '@utils/bem';
import './styles.scss';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  desc?: string;
  decorative?: boolean;
  size?: number;
}

export const Icon = ({
  name,
  className,
  desc,
  decorative = false,
  size,
  style,
  ...props
}: IconProps) => {
  const role = decorative ? 'presentation' : 'img';
  const titleText = desc || name;
  const iconStyle = size ? { width: `${size}px`, height: `${size}px` } : {};
  const titleId = `icon-title-${name}`;
  const descId = desc ? `icon-desc-${name}` : undefined;

  return (
    <svg
      className={bem(
        {
          block: 'icon',
          modifiers: [name],
          extra: `${className || ''}`
        }
      )}
      role={role}
      aria-hidden={decorative ? 'true' : undefined}
      aria-labelledby={decorative ? undefined : [titleId, descId].filter(Boolean).join(' ')}
      style={{ ...iconStyle, ...style }}
      {...props}
    >
      <use href={`/icons-sprite.svg#${name}`} />
      {!decorative && (
        <>
          <title id={titleId}>{titleText}</title>
          {desc && <desc id={descId}>{desc}</desc>}
        </>
      )}
    </svg>
  );
};

Icon.displayName = 'Icon';

export default Icon;
