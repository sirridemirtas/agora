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

    const handleThemeChange = () => {
      if (theme === "system") {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    document.body.classList.remove("light", "dark");
    if (theme === "system") {
      document.body.classList.add(mediaQuery.matches ? "dark" : "light");
    } else {
      document.body.classList.add(theme);
    }

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
