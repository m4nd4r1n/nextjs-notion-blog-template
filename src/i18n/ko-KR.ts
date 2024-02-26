export default {
  nav: {
    index: 'Blog',
    search: 'Search',
    about: 'About',
  },
  pagination: {
    prev: '이전',
    next: '다음',
  },
  post: {
    home: '홈으로',
    top: '상단으로',
    tags: '태그',
    prev: '이전 글',
    next: '다음 글',
  },
  search: {
    input: {
      label: '검색',
      placeholder: {
        tag_selected: '#{currentTag}에서 검색',
        default: '게시물 검색',
      },
    },
    no_post: '게시물을 찾을 수 없습니다.',
  },
  code: {
    copy: '복사',
    copied: '복사 완료',
  },
  date: {
    published: '게시일',
  },
  switch: {
    theme: '테마 변경',
  },
  list: {
    read: { default: '자세히 보기', aria: '"{title}" 읽기' },
  },
  scroll: {
    aria: { comment: '댓글로 스크롤', top: '상단으로 스크롤' },
  },
} as const;
