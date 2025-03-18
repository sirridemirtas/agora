import { useApi } from '@/hooks';
import { useCallback, useMemo } from 'react';
import { UserService, UserProfile, PrivacyUpdateResponse } from '@/services/UserService';

export const useUserService = () => {
  // Create userService instance once with useMemo
  const userService = useMemo(() => new UserService(), []);
  
  // Memoize bound API functions to prevent recreating them on each render
  const getUserProfileFn = useMemo(() => 
    userService.getUserProfile.bind(userService), 
  [userService]);
  
  const updatePrivacySettingFn = useMemo(() => 
    userService.updatePrivacySetting.bind(userService), 
  [userService]);

  const {
    data: userProfile,
    error: userProfileError,
    loading: userProfileLoading,
    execute: executeGetUserProfile,
  } = useApi<UserProfile, [string]>(getUserProfileFn);

  const {
    data: privacyUpdateResponse,
    error: privacyUpdateError,
    loading: privacyUpdateLoading,
    execute: executeUpdatePrivacySetting,
  } = useApi<PrivacyUpdateResponse, [boolean]>(updatePrivacySettingFn);

  const getUserProfile = useCallback(async (username: string) => {
    return executeGetUserProfile(username);
  }, [executeGetUserProfile]);

  const updatePrivacySetting = useCallback(async (isPrivate: boolean) => {
    return executeUpdatePrivacySetting(isPrivate);
  }, [executeUpdatePrivacySetting]);

  return {
    // User profile data and operations
    userProfile,
    userProfileError,
    userProfileLoading,
    getUserProfile,
    
    // Privacy settings data and operations
    privacyUpdateResponse,
    privacyUpdateError,
    privacyUpdateLoading,
    updatePrivacySetting,
  };
};
