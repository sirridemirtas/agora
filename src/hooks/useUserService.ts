import { useCallback, useMemo } from 'react';
import { useApi } from './useApi';
import { UserService, UserProfile, PrivacyUpdateResponse, PasswordResetResponse } from '@/services/UserService';

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

  const resetPasswordFn = useMemo(() => 
    userService.resetPassword.bind(userService), 
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

  const {
    data: passwordResetResponse,
    error: passwordResetError,
    loading: passwordResetLoading,
    execute: executeResetPassword,
  } = useApi<PasswordResetResponse, [string, string]>(resetPasswordFn);

  const getUserProfile = useCallback(async (username: string) => {
    return executeGetUserProfile(username);
  }, [executeGetUserProfile]);

  const updatePrivacySetting = useCallback(async (isPrivate: boolean) => {
    return executeUpdatePrivacySetting(isPrivate);
  }, [executeUpdatePrivacySetting]);

  const resetPassword = useCallback(async (currentPassword: string, newPassword: string) => {
    return executeResetPassword(currentPassword, newPassword);
  }, [executeResetPassword]);

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
    
    // Password reset data and operations
    passwordResetResponse,
    passwordResetError,
    passwordResetLoading,
    resetPassword,
  };
};
