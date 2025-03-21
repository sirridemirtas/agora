import { BaseService } from './BaseService';
import { ApiResponse } from './types';
import { Post } from '@/types';

export interface CreatePostDto {
  content: string;
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

  async getUniversityPosts(universityId: string): Promise<ApiResponse<Post[]>> {
    return this.fetchApi<Post[]>(`/posts/university/${universityId}`, {
      method: 'GET',
    });
  }

  async getUserPosts(username: string): Promise<ApiResponse<Post[]>> {
    return this.fetchApi<Post[]>(`/users/${username}/posts`, {
      method: 'GET',
    });
  }

  async getPostReplies(postId: string): Promise<ApiResponse<Post[]>> {
    return this.fetchApi<Post[]>(`/posts/${postId}/replies`, {
      method: 'GET',
    });
  }
}
