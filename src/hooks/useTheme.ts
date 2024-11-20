import { useContext } from "react";
import ThemeContext, { ThemeContextType } from "@/contexts/ThemeProvider";

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
