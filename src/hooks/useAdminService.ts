import { useState } from 'react';
import { adminService, UpdateRoleResponse } from '../services/AdminService';
import { ApiResponse } from '../services/types';

export const useAdminService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserRole = async (
    username: string, 
    role: number
  ): Promise<ApiResponse<UpdateRoleResponse> | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await adminService.updateUserRole(username, role);
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateUserRole
  };
};
