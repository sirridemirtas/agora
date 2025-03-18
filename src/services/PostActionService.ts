import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export interface PostReaction {
  likeCount: number;
  dislikeCount: number;
  liked?: boolean;
  disliked?: boolean;
}

export class PostActionService extends BaseService {
  async likePost(postId: string): Promise<ApiResponse<PostReaction>> {
    return this.fetchApi<PostReaction>(`/posts/${postId}/like`, {
      method: 'POST',
    });
  }

  async dislikePost(postId: string): Promise<ApiResponse<PostReaction>> {
    return this.fetchApi<PostReaction>(`/posts/${postId}/dislike`, {
      method: 'POST',
    });
  }

  async unlikePost(postId: string): Promise<ApiResponse<PostReaction>> {
    return this.fetchApi<PostReaction>(`/posts/${postId}/unlike`, {
      method: 'POST',
    });
  }

  async undislikePost(postId: string): Promise<ApiResponse<PostReaction>> {
    return this.fetchApi<PostReaction>(`/posts/${postId}/undislike`, {
      method: 'POST',
    });
  }
}
