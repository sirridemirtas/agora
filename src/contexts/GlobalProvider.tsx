import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { PageTitleProvider } from "./PageTitleProvider";
import { SnackbarProvider } from "./SnackbarProvider";
import { NewPostProvider } from "./NewPostPlaceholder";

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <PageTitleProvider>
            <NewPostProvider>{children}</NewPostProvider>
          </PageTitleProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
