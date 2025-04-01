import { BaseService } from './BaseService';
import { ApiResponse } from './types';
import { Post } from '@/types';

export interface CreatePostDto {
  content: string;
  universityId?: string | null; // Optional field for university posts
  replyTo?: string; // Optional field for replies
}

export class PostService extends BaseService {
  async createPost(data: CreatePostDto): Promise<ApiResponse<Post>> {
    return this.fetchApi<Post>('/posts', {
      method: 'POST',
      data: JSON.stringify(data),
    });
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    return this.fetchApi<Post>(`/posts/${id}`, {
      method: 'GET',
    });
  }

  async getPostReplies(postId: string, page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined 
      ? `/posts/${postId}/replies?page=${page}` 
      : `/posts/${postId}/replies`;
    return this.fetchApi<Post[]>(url, {
      method: 'GET',
    });
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }


  // FEEDS

  async getHomeFeed(page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined ? `/feeds/home?page=${page}` : '/feeds/home';
    return this.fetchApi<Post[]>(url, {
      method: 'GET',
    });
  }

  async getUniversityFeed(universityId: string, page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined 
      ? `/feeds/universities/${universityId}?page=${page}` 
      : `/feeds/universities/${universityId}`;
    return this.fetchApi<Post[]>(url, {
      method: 'GET',
    });
  }

  async getUserFeed(username: string, page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined 
      ? `/feeds/users/${username}?page=${page}` 
      : `/feeds/users/${username}`;
    return this.fetchApi<Post[]>(url, {
      method: 'GET',
    });
  }
}
