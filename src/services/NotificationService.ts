import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export type Notification = {
  id: string;
  username: string;
  postId: string;
  postSnippet: string;
  type: 'reaction' | 'reply';
  likeCount?: number;
  dislikeCount?: number;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UnreadCountResponse = {
  unreadCount: number;
};

export class NotificationService extends BaseService {
  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    try {
      const response = await this.fetchApi<Notification[]>('/notifications');
      return response;
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
        loading: false,
      };
    }
  }

  async getUnreadCount(): Promise<ApiResponse<UnreadCountResponse>> {
    try {
      const response = await this.fetchApi<UnreadCountResponse>('/notifications/unread-count');
      return response;
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
        loading: false,
      };
    }
  }

  async markAsRead(notificationId: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.fetchApi<void>(`/notifications/${notificationId}`, {
        method: 'POST'
      });
      return response;
    } catch (error) {
      return {
        data: null,
        error: this.handleError(error),
        loading: false,
      };
    }
  }
}
