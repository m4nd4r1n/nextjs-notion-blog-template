'use client';

// ref: https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/third-party/code.tsx
import { type FC, useCallback, useRef, useState } from 'react';

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import type { CodeBlock } from 'notion-types';
import { getTextContent } from 'notion-utils';
import { highlightElement } from 'prismjs';
import { Text } from 'react-notion-x';

import { I18nProviderClient, useScopedI18n } from '@/i18n/client';

interface CodeProps {
  block: CodeBlock;
}

const LANG = Object.freeze({
  ASSEMBLY: 'assembly',
  MERMAID: 'mermaid',
  ARM_ASSEMBLY: 'armasm',
});

const Code: FC<CodeProps> = (props) => {
  return (
    <I18nProviderClient>
      <CodeImpl {...props} />
    </I18nProviderClient>
  );
};

const CodeImpl: FC<CodeProps> = ({ block }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef<number | null>();
  const { theme, resolvedTheme } = useTheme();
  const t = useScopedI18n('code');

  if (block.properties.language[0][0].toLowerCase() === LANG.ASSEMBLY)
    block.properties.language = [[LANG.ARM_ASSEMBLY]];

  const content = getTextContent(block.properties.title);
  const language = getTextContent(block.properties.language).toLowerCase();
  const { caption } = block.properties;
  const { id } = block;
  const isMermaid = language === LANG.MERMAID;
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);

    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current);
      copyTimeout.current = null;
    }

    copyTimeout.current = setTimeout(() => {
      setIsCopied(false);
    }, 1200) as unknown as number;
  };

  const highlightRef = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    try {
      highlightElement(el);
    } catch (e) {
      console.warn('prismjs highlight error', e);
    }
  }, []);

  const mermaidRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return;
      mermaid.initialize({
        theme: isDark ? 'dark' : 'neutral',
      });
      mermaid
        .render(`mermaid-${id}`, content)
        .then(({ svg, bindFunctions }) => {
          el.innerHTML = svg;
          bindFunctions?.(el);
        });
    },
    [id, content, isDark],
  );

  return (
    <>
      <pre className='notion-code'>
        <div className='notion-code-copy'>
          <button
            className='hover-active inline-flex items-center gap-0.5 rounded-md border-0 bg-button-light text-xs shadow-none em:p-1.5 dark:bg-button-dark dark:text-code-dark'
            onClick={handleCopy}
          >
            <ClipboardDocumentIcon className='h-4 w-4' />
            {t('copy')}
          </button>

          {isCopied && (
            <div className='notion-code-copy-tooltip'>
              <div className='border-neutral-200/20 dark:border'>
                {t('copied')}
              </div>
            </div>
          )}
        </div>

        <div className='overflow-x-auto'>
          <code className={`language-${language}`} ref={highlightRef}>
            {content}
          </code>
        </div>
        {isMermaid && <div className='flex justify-center' ref={mermaidRef} />}
      </pre>

      {caption && (
        <figcaption className='notion-asset-caption'>
          <Text value={caption} block={block} />
        </figcaption>
      )}
    </>
  );
};

export default Code;
