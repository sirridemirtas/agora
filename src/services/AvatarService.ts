import { BaseService } from './BaseService';
import { ApiResponse } from './types';
import { AvatarConfig } from '@/components/common/Avatar';

// Updated response type to match the API
export type AvatarResponse = AvatarConfig;

export class AvatarService extends BaseService {
  async getUserAvatar(username: string): Promise<ApiResponse<AvatarResponse>> {
    return this.fetchApi<AvatarResponse>(`/users/${username}/avatar`, {method: 'GET'});
  }

  async updateUserAvatar(username: string, config: AvatarConfig): Promise<ApiResponse<AvatarResponse>> {
    return this.fetchApi<AvatarResponse>(`/users/${username}/avatar`, {method: 'POST', data: config });
  }
}

