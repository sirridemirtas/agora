import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export interface UserProfile {
  username: string;
  isPrivate: boolean;
  role: number;
  universityId: string;
  createdAt?: string; // Optional as mentioned
}

export interface PrivacyUpdateResponse {
  isPrivate: boolean;
  message: string;
}

export class UserService extends BaseService {
  async getUserProfile(username: string): Promise<ApiResponse<UserProfile>> {
    return this.fetchApi<UserProfile>(`/users/${username}`, {
      method: 'GET',
    });
  }

  async updatePrivacySetting(isPrivate: boolean): Promise<ApiResponse<PrivacyUpdateResponse>> {
    return this.fetchApi<PrivacyUpdateResponse>('/users/privacy', {
      method: 'PUT',
      data: { isPrivate },
    });
  }
}

