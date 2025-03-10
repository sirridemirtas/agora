import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
  universityId: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
}

export class AuthService extends BaseService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    return this.fetchApi<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.fetchApi<void>('/auth/logout', {
      method: 'POST',
    });
  }

  async register(credentials: RegisterCredentials): Promise<ApiResponse<User>> {
    return this.fetchApi<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}
