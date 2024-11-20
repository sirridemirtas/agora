import React from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={toggleTheme}>
        Toggle Theme ({theme === "light" ? "Light" : "Dark"})
      </button>
      <p>Current Theme: {theme}</p>
    </div>
  );
};

export default ThemeToggleButton;
