// ref: https://github.com/craigary/nobelium/blob/main/components/notion-blocks/Toggle.js
//      https://github.com/craigary/nobelium/blob/main/styles/notion.css#L196-L251
import type { PropsWithChildren } from 'react';

import type { ToggleBlock } from 'notion-types';
import { Text } from 'react-notion-x';

import { cn } from '@/utils/cn';

interface ToggleProps extends PropsWithChildren {
  block: ToggleBlock;
}

export default function Toggle({ block, children }: ToggleProps) {
  const hasChildren = !!children;

  return (
    <details
      className={cn(
        'my-0.5 w-full py-0 marker:content-[""] [&_&]:mb-0 [&_&]:mt-1',
        block.format?.block_color && `notion-${block.format.block_color}`,
        {
          '[&[open]>*>span>svg]:rotate-180': hasChildren,
        },
      )}
    >
      <summary
        className={cn('relative flex cursor-pointer items-start', {
          'cursor-default': !hasChildren,
        })}
      >
        <span className='w-7 flex-none text-center leading-[inherit]'>
          <svg
            className={cn(
              'inline-block h-[0.6875rem] w-[0.6875rem] rotate-90 fill-current transition-transform duration-200 ease-out [backface-visibility:hidden]',
              {
                'opacity-50': !hasChildren,
              },
            )}
            viewBox='0 0 100 100'
          >
            <polygon points='5.9,88.2 50,11.8 94.1,88.2' />
          </svg>
        </span>
        <span className='flex-1'>
          <Text value={block.properties.title} block={block} />
        </span>
      </summary>
      {children && (
        <div className='mt-0.5 pl-7 [&>*:not(.notion-h)]:my-0.5 [&>:last-child]:mb-0'>
          {children}
        </div>
      )}
    </details>
  );
}
