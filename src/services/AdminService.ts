import { BaseService } from './BaseService';
import { ApiResponse } from './types';

export interface UpdateRoleRequest {
  role: number;
}

export interface UpdateRoleResponse {
  message: string;
}

export class AdminService extends BaseService {
  /**
   * Updates a user's role. Role can only be 0 or 1.
   * @param username The username of the user to update
   * @param role The new role (0 or 1)
   * @returns ApiResponse with a success message
   */
  public async updateUserRole(
    username: string,
    role: number
  ): Promise<ApiResponse<UpdateRoleResponse>> {
    if (role !== 0 && role !== 1) {
      throw new Error('Role can only be 0 or 1');
    }
    
    return this.fetchApi<UpdateRoleResponse>(`/admin/users/${username}/role`, { data: { role }, method: 'PUT' });
  }
}

// Create a singleton instance
export const adminService = new AdminService();

