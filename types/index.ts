export interface Article {
  id: number;
  cover: string | null;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  date: string;
  tags: string[];
  likes: number;
  likedByUsers: string[];
  replies: number;
  views: number;
}

export interface ArticleData {
  articles: Article[];
  hasMore: boolean;
}

export interface Tag {
  tag: string;
  count: number;
  likes: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
  emailVerified: boolean;
}
