"use client";
import { createContext, ReactNode } from "react";
import { useSharedState } from "@/hooks";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: (userData?: { username: string; universityId: string }) => void;
  logout: () => void;
  isLoading: boolean;
  username: string | null;
  universityId: string | null;
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

  const login = (userData?: { username: string; universityId: string }) => {
    if (userData) {
      setUsername(userData.username);
      setUniversityId(userData.universityId);
    }
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername(null);
    setUniversityId(null);
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
