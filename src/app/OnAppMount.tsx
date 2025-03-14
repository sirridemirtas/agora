"use client";
import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { AuthService } from "@/services/AuthService";

export default function OnAppMount() {
  const { login: setAppStateToLoggedIn, logout } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authService = new AuthService();
        const response = await authService.getTokenInfo();

        if (response && response.data) {
          const { username, universityId } = response.data;
          setAppStateToLoggedIn({ username, universityId });
        } else {
          logout();
        }
      } catch (error) {
        console.error("Failed to verify authentication status:", error);
        logout();
      }
    };

    checkAuthStatus();
  }, [logout, setAppStateToLoggedIn]);

  return null;
}
