import { BaseService } from './BaseService';
import { ApiResponse } from './types';
import { Post } from '@/types';

export interface CreatePostDto {
  content: string;
  universityId?: string | null; // Optional field for university posts
  replyTo?: string; // Optional field for replies
}

export class PostService extends BaseService {
  async getPosts(page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined ? `/posts?page=${page}` : '/posts';
    return this.fetchApi<Post[]>(url, {
      method: 'GET',
    });
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    return this.fetchApi<Post>(`/posts/${id}`, {
      method: 'GET',
    });
  }

  async createPost(data: CreatePostDto): Promise<ApiResponse<Post>> {
    return this.fetchApi<Post>('/posts', {
      method: 'POST',
      data: JSON.stringify(data),
    });
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async getUniversityPosts(universityId: string, page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined 
      ? `/posts/university/${universityId}?page=${page}` 
      : `/posts/university/${universityId}`;
    return this.fetchApi<Post[]>(url, {
      method: 'GET',
    });
  }

  async getUserPosts(username: string, page?: number): Promise<ApiResponse<Post[]>> {
    const url = page !== undefined 
      ? `/users/${username}/posts?page=${page}` 
      : `/users/${username}/posts`;
    return this.fetchApi<Post[]>(url, {
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
}
