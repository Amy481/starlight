export interface Article {
  id: number;
  cover: string | null;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  date: string;
  likes: number;
  replies: number;
  views: number;
  tags: {
    id: number;
    name: string;
    count: number;
    likes: number;
  }[];
  likedByUsers: {
    id: string;
    name: string;
    avatar: string;
    email: string;
    password: string;
    emailVerified: boolean;
  }[];
}

export interface ArticleData {
  articles: Article[];
  hasMore: boolean;
}

export interface Tag {
  id: number;
  name: string;
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
