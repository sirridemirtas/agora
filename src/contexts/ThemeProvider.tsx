"use client";
import { createContext, useEffect, useState, ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("system");

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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
