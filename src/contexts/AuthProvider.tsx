"use client";

import React, { createContext, ReactNode } from "react";
import { useSharedState } from "@/hooks/useSharedState";

export interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn, isLoading] = useSharedState(
    "authState",
    false
  );

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
