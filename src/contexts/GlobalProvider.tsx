import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { PageTitleProvider } from "./PageTitleProvider";

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <PageTitleProvider>{children}</PageTitleProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
