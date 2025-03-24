import { useApi } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { AvatarService, AvatarResponse } from '@/services/AvatarService';
import { AvatarConfig } from '@/components/common/Avatar';

export const useAvatar = () => {
  // Create avatarService instance once with useMemo
  const avatarService = useMemo(() => new AvatarService(), []);
  
  // Memoize bound API functions
  const getUserAvatarFn = useMemo(() => 
    avatarService.getUserAvatar.bind(avatarService), 
  [avatarService]);
  
  const updateUserAvatarFn = useMemo(() => 
    avatarService.updateUserAvatar.bind(avatarService), 
  [avatarService]);

  const {
    data: avatarData,
    error: avatarError,
    loading: avatarLoading,
    execute: executeGetUserAvatar,
  } = useApi<AvatarResponse, [string]>(getUserAvatarFn);

  const {
    data: avatarUpdateResponse,
    error: avatarUpdateError,
    loading: avatarUpdateLoading,
    execute: executeUpdateUserAvatar,
  } = useApi<AvatarResponse, [string, AvatarConfig]>(updateUserAvatarFn);

  const getUserAvatar = useCallback(async (username: string) => {
    return executeGetUserAvatar(username);
  }, [executeGetUserAvatar]);

  const updateUserAvatar = useCallback(async (username: string, config: AvatarConfig) => {
    return executeUpdateUserAvatar(username, config);
  }, [executeUpdateUserAvatar]);

  return {
    avatarData,
    avatarError,
    avatarLoading,
    getUserAvatar,
    
    avatarUpdateResponse,
    avatarUpdateError,
    avatarUpdateLoading,
    updateUserAvatar,
  };
};
