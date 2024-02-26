import type { FC } from 'react';

import TagItem from '@/components/tag-item';
import { getScopedI18n } from '@/i18n/server';
import type { SelectColor } from '@/types';

interface PostTagsProps {
  tags?: { tag: string; color: SelectColor }[];
}

const PostTags: FC<PostTagsProps> = async ({ tags }) => {
  if (!tags) return null;

  const t = await getScopedI18n('post');

  return (
    <div className='py-4'>
      <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
        {t('tags')}
      </h2>
      <div className='flex flex-wrap'>
        {tags.map((tag) => (
          <TagItem key={tag.tag} {...tag} />
        ))}
      </div>
    </div>
  );
};

export default PostTags;
