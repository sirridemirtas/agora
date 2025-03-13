"use client";
import { Sun, Moon, Monitor } from "lucide-react";
import { RadioGroup } from "@/components/ui";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      value: "system" as const,
      icon: <Monitor size={18} />,
      ariaLabel: "Sistem Teması",
    },
    { value: "dark" as const, icon: <Moon size={18} />, ariaLabel: "Koyu Mod" },
    { value: "light" as const, icon: <Sun size={18} />, ariaLabel: "Açık Mod" },
  ];

  return (
    <RadioGroup
      value={theme}
      onChange={setTheme}
      options={options}
      variant="icon"
    />
  );
};

export default ThemeToggleButton;
