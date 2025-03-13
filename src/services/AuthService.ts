import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export interface LoginCredentials {
  username: string;
  password: string;
  universityId: string;
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
  universityId: string;
}

export interface TokenInfo {
  expiresAt: string;
  role: number;
  universityId: string;
  userId: string;
  username: string;
}

export interface UsernameCheckResponse {
  available: boolean;
  message: string;
  valid: boolean;
}

export class AuthService extends BaseService {
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    return this.fetchApi<User>('/auth/login', {
      method: 'POST',
      data: credentials,
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
      data: credentials,
    });
  }

  async getTokenInfo(): Promise<ApiResponse<TokenInfo>> {
    return this.fetchApi<TokenInfo>('/auth/token-info', {
      method: 'GET',
    });
  }

  async checkUsername(username: string): Promise<ApiResponse<UsernameCheckResponse>> {
    return this.fetchApi<UsernameCheckResponse>(`/users/check-username/${username}`, {
      method: 'GET',
    });
  }
}
