export type PostType = 'Post' | 'Page';

export type PostStatus = 'Idea' | 'Revise' | 'Published' | 'Draft';

export type Properties = {
  id?: string;
  date?: { start_date?: string; time_zone?: string; start_time?: string };
  type?: [PostType] | string[];
  slug?: string;
  tags?: string[];
  summary?: string;
  title?: string;
  status?: [PostStatus] | string[];
};

export type Post = {
  date: number;
  tags: {
    tag: string;
    color: SelectColor;
  }[];
  pageCover: string;
} & Omit<Properties, 'date' | 'tags'>;

export type SelectColor =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red';
