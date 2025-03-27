import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export interface Message {
  sender: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  createdAt: string;
  lastUpdated: string;
  messages: Message[];
  unreadCounts: Record<string, number>;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

export interface SendMessageRequest {
  content: string;
}

export class MessageService extends BaseService {
  async getConversations(): Promise<ApiResponse<Conversation[]>> {
    return this.fetchApi<Conversation[]>('/messages', {
      method: 'GET',
    });
  }

  async getUnreadCount(): Promise<ApiResponse<UnreadCountResponse>> {
    return this.fetchApi<UnreadCountResponse>('/messages/unread-count', {
      method: 'GET',
    });
  }

  async getConversation(username: string): Promise<ApiResponse<Conversation>> {
    return this.fetchApi<Conversation>(`/messages/${username}`, {
      method: 'GET',
    });
  }

  async sendMessage(username: string, content: string): Promise<ApiResponse<Conversation>> {
    return this.fetchApi<Conversation>(`/messages/${username}`, {
      method: 'POST',
      data: { content },
    });
  }

  async markAsRead(username: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`/messages/${username}/read`, {
      method: 'POST',
    });
  }

  async deleteConversation(username: string): Promise<ApiResponse<void>> {
    return this.fetchApi<void>(`/messages/${username}`, {
      method: 'DELETE',
    });
  }
}

