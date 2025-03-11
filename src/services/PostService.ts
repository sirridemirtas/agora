import { BaseService } from './BaseService';
import { ApiResponse } from './types';
import { Post } from '@/types';

export interface CreatePostDto {
  content: string;
}

export class PostService extends BaseService {
  async getPosts(): Promise<ApiResponse<Post[]>> {
    return this.fetchApi<Post[]>('/posts', {
      method: 'GET',
    });
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    console.log('id', id);
    return this.fetchApi<Post>(`/posts/${id}`, {
      method: 'GET',
    });
  }

  async createPost(data: CreatePostDto): Promise<ApiResponse<Post>> {
    return this.fetchApi<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }
}
