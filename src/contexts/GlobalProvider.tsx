import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { PageTitleProvider } from "./PageTitleProvider";
import { SnackbarProvider } from "./SnackbarProvider";
import { NewPostProvider } from "./NewPostPlaceholder";
import { NotificationsProvider } from "./NotificationsProvider";
import { LoginModalProvider } from "./LoginModalProvider";

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LoginModalProvider>
          <SnackbarProvider>
            <PageTitleProvider>
              <NotificationsProvider>
                <NewPostProvider>{children}</NewPostProvider>
              </NotificationsProvider>
            </PageTitleProvider>
          </SnackbarProvider>
        </LoginModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
