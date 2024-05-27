export interface Article {
  id: number;
  cover: string | null;
  title: string;
  content: string;
  authorId: number;
  date: string;
  tags: string[];
  likes: number;
  replies: number;
  views: number;
}

export interface Tag {
  tag: string;
  count: number;
  likes: number;
}
