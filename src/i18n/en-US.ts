export default {
  nav: {
    index: 'Blog',
    search: 'Search',
    about: 'About',
  },
  pagination: {
    prev: 'Prev',
    next: 'Next',
  },
  post: {
    home: 'Home',
    top: 'Top',
    tags: 'Tags',
    prev: 'Previous Article',
    next: 'Next Article',
  },
  404: {
    message: 'Nothing here',
    go_home: 'Go to home',
  },
  search: {
    input: {
      label: 'Search',
      placeholder: {
        tag_selected: 'Search in #{currentTag}',
        default: 'Search Articles',
      },
    },
    no_post: 'No posts found.',
  },
  code: {
    copy: 'Copy',
    copied: 'Copied',
  },
  date: {
    published: 'Published on',
  },
  switch: {
    theme: 'Switch theme',
  },
  list: {
    read: { default: 'Read more', aria: 'Read "{title}"' },
  },
  scroll: {
    aria: { comment: 'Scroll To Comment', top: 'Scroll To Top' },
  },
} as const;
