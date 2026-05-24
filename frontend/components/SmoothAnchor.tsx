'use client';

import { ReactNode, AnchorHTMLAttributes } from 'react';

interface SmoothAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  href: string;
}

export const SmoothAnchor = ({ href, children, onClick, ...props }: SmoothAnchorProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = href?.startsWith('#') ? href.slice(1) : null;

    if (target) {
      e.preventDefault();
      const element = document.getElementById(target);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', href);
      }
    }

    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
