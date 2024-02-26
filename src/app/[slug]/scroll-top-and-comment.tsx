'use client';

import { type ComponentPropsWithoutRef, type FC, useState } from 'react';

import {
  ArrowUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/outline';

import config from '@/../blog.config';
import useOnScroll from '@/hooks/use-on-scroll';
import { I18nProviderClient, useScopedI18n } from '@/i18n/client';
import { cn } from '@/utils/cn';

interface ScrollTopAndCommentProps {
  className?: string;
}

const ScrollTopAndComment: FC<ScrollTopAndCommentProps> = (props) => {
  return (
    <I18nProviderClient>
      <ScrollTopAndCommentImpl {...props} />
    </I18nProviderClient>
  );
};

const ScrollTopAndCommentImpl: FC<ScrollTopAndCommentProps> = ({
  className,
}) => {
  const [show, setShow] = useState(false);
  const t = useScopedI18n('scroll.aria');

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWindowScroll = () => {
    if (window.scrollY > 50) setShow(true);
    else setShow(false);
  };

  useOnScroll(handleWindowScroll);

  return (
    <div
      className={cn(className, 'z-50 hidden flex-col gap-3', {
        'md:flex': show,
      })}
    >
      {config.comments?.provider && (
        <CircleButton aria-label={t('comment')} onClick={handleScrollToComment}>
          <ChatBubbleOvalLeftEllipsisIcon className='h-5 w-5' strokeWidth={2} />
        </CircleButton>
      )}
      <CircleButton aria-label={t('top')} onClick={handleScrollToTop}>
        <ArrowUpIcon className='h-5 w-5' strokeWidth={2} />
      </CircleButton>
    </div>
  );
};

export default ScrollTopAndComment;

const CircleButton: FC<ComponentPropsWithoutRef<'button'>> = ({
  className,
  ...props
}) => (
  <button
    className={cn(
      className,
      'rounded-full bg-neutral-200 p-2 text-neutral-500 hover:bg-neutral-300 active:bg-neutral-400 motion-safe:transition-colors dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:active:bg-neutral-500',
    )}
    {...props}
  />
);
