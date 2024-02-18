import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type {
  AnchorHTMLAttributes,
  FC,
  PropsWithChildren,
  RefAttributes,
} from 'react';

import { cn } from '@/utils/cn';

interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    PropsWithChildren,
    RefAttributes<HTMLAnchorElement> {}

const Link: FC<LinkProps> = ({ className, ...props }) => {
  return (
    <NextLink
      className={cn(
        'text-primary-500 hover:text-primary-600 motion-safe:transition-colors dark:hover:text-primary-400',
        className,
      )}
      {...props}
    />
  );
};

export default Link;
