import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { PageTitleProvider } from "./PageTitleProvider";
import { SnackbarProvider } from "./SnackbarProvider";

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <PageTitleProvider>{children}</PageTitleProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
