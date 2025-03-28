"use client";
import { createContext, useEffect, ReactNode } from "react";
import { useSharedState } from "@/hooks";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme, isLoading] = useSharedState<Theme>("theme", "system");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateThemeAndFavicon = () => {
      document.body.classList.remove("light", "dark");
      if (theme === "system") {
        document.body.classList.add(mediaQuery.matches ? "dark" : "light");
      } else {
        document.body.classList.add(theme);
      }

      let faviconUrl = "/favicon.ico";
      if (theme === "dark" || (theme === "system" && mediaQuery.matches)) {
        faviconUrl = "/favicon-dark.ico";
      }

      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    };

    updateThemeAndFavicon();

    const handleThemeChange = () => {
      if (theme === "system") {
        updateThemeAndFavicon();
      }
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
