import { BaseService } from './BaseService';
import { ApiResponse } from './types';
import { AvatarConfig } from '@/components/common/Avatar';

// Updated response type to match the API
export type AvatarResponse = AvatarConfig;

export class AvatarService extends BaseService {
  private static instance: AvatarService;
  // Static cache shared across all instances
  private static avatarCache: Record<string, ApiResponse<AvatarResponse>> = {};
  // Track ongoing requests to prevent duplicates
  private static pendingRequests: Record<string, Promise<ApiResponse<AvatarResponse>>> = {};

  // Factory method to ensure we always use the same instance
  public static getInstance(): AvatarService {
    if (!AvatarService.instance) {
      AvatarService.instance = new AvatarService();
    }
    return AvatarService.instance;
  }

  async getUserAvatar(username: string): Promise<ApiResponse<AvatarResponse>> {
    // Return cached response if available
    if (AvatarService.avatarCache[username]) {
      return AvatarService.avatarCache[username];
    }
    
    // If this request is already in-flight, return the existing promise
    if (username in AvatarService.pendingRequests) {
      return AvatarService.pendingRequests[username];
    }
    
    // Create a new request and track it
    const requestPromise = this.fetchApi<AvatarResponse>(`/users/${username}/avatar`, {method: 'GET'})
      .then(response => {
        // Store in cache for future requests
        AvatarService.avatarCache[username] = response;
        // Remove from pending requests
        delete AvatarService.pendingRequests[username];
        return response;
      })
      .catch(error => {
        // Remove from pending requests on error too
        delete AvatarService.pendingRequests[username];
        throw error;
      });
    
    // Store the promise for any concurrent requests
    AvatarService.pendingRequests[username] = requestPromise;
    
    return requestPromise;
  }

  async updateUserAvatar(username: string, config: AvatarConfig): Promise<ApiResponse<AvatarResponse>> {
    // Invalidate cache when avatar is updated
    delete AvatarService.avatarCache[username];
    // Also clear any pending requests
    delete AvatarService.pendingRequests[username];
    
    return this.fetchApi<AvatarResponse>(`/users/${username}/avatar`, {method: 'POST', data: config });
  }
}

