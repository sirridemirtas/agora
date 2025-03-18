export interface Post {
  id: string;
  content: string;
  createdAt: string;
  university: string;
  universityId: string;
  upvotes: number;
  downvotes: number;
  username?: string;
  isPrivate: boolean;
  reactions: {
    likeCount: number;
    dislikeCount: number;
    liked?: boolean;
    disliked?: boolean;
  };
}

export interface Reply extends Post {
  replyTo: string;
}

export interface User {
  username: string;
  university: string;
  isPrivate: boolean;
  role: 'user' | 'moderator' | 'admin';
}

export interface University {
  id: string;
  name: string;
}
