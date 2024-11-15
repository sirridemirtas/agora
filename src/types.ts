export interface Post {
  id: string;
  content: string;
  timestamp: string;
  university: string;
  upvotes: number;
  downvotes: number;
  username?: string;
  isPrivate: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  timestamp: string;
  username?: string;
  isPrivate: boolean;
}

export interface User {
  username: string;
  university: string;
  isPrivate: boolean;
  role: 'user' | 'moderator' | 'admin';
}