"use client";
import { createContext, ReactNode, useEffect } from "react";
import { useSharedState } from "@/hooks";
import { AuthService } from "@/services/AuthService";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (userData?: {
    username: string;
    universityId: string;
    role?: number;
  }) => void;
  logout: () => void;
  isLoading: boolean;
  username: string | null;
  universityId: string | null;
  role: number | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn, isLoading] = useSharedState(
    "authState",
    false
  );
  const [username, setUsername] = useSharedState<string | null>(
    "username",
    null
  );
  const [universityId, setUniversityId] = useSharedState<string | null>(
    "universityId",
    null
  );
  // Changed key from "userRole" to "role" to match API response
  const [role, setRole] = useSharedState<number | null>("role", null);

  const login = (userData?: {
    username: string;
    universityId: string;
    role?: number;
  }) => {
    if (userData) {
      setUsername(userData.username);
      setUniversityId(userData.universityId);
      if (userData.role !== undefined) {
        setRole(userData.role);
      }
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setUniversityId(null);
    setRole(null);
  };

  // Check authentication status on first mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authService = new AuthService();
        const response = await authService.getTokenInfo();

        if (response && response.data) {
          const { username, universityId, role } = response.data;
          login({ username, universityId, role });
        } else {
          logout();
        }
      } catch (error) {
        console.error("Failed to verify authentication status:", error);
        logout();
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) return null;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isLoading,
        username,
        universityId,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
