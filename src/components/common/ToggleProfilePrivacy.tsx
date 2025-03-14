"use client";
import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui";
import { useAuth, useUserService } from "@/hooks";

export default function ToggleProfilePrivacy() {
  const { username } = useAuth();
  const {
    userProfile,
    userProfileLoading,
    getUserProfile,
    privacyUpdateLoading,
    updatePrivacySetting,
  } = useUserService();

  const [isPrivate, setIsPrivate] = useState<boolean | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Fetch profile only once when component mounts
  useEffect(() => {
    if (username && !hasInitialized) {
      getUserProfile(username);
      setHasInitialized(true);
    }
  }, [username, getUserProfile, hasInitialized]);

  // Update state only when profile data changes
  useEffect(() => {
    if (userProfile && userProfile.isPrivate !== isPrivate) {
      setIsPrivate(userProfile.isPrivate);
    }
  }, [userProfile]);

  const handleToggle = useCallback(async () => {
    if (isPrivate === null) return;

    const newValue = !isPrivate;
    setIsPrivate(newValue); // Optimistically update UI

    const response = await updatePrivacySetting(newValue);

    if (response.error) {
      // Revert to previous state if there's an error
      setIsPrivate(isPrivate);
    }
  }, [isPrivate, updatePrivacySetting]);

  // Wait until we have loaded the profile
  if (isPrivate === null || userProfileLoading) {
    return <Switch checked={false} onChange={() => {}} disabled />;
  }

  return (
    <Switch
      checked={isPrivate}
      onChange={handleToggle}
      disabled={privacyUpdateLoading}
    />
  );
}
