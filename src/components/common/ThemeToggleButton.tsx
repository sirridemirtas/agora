"use client";
import cn from "classnames";
import { Sun, Moon, Monitor, LucideIcon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

type Theme = "system" | "dark" | "light";

interface ThemeButtonProps {
  themeName: Theme;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  Icon: LucideIcon;
  label: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  themeName,
  currentTheme,
  setTheme,
  Icon,
  label,
}) => {
  return (
    <button
      onClick={() => setTheme(themeName)}
      className={cn(
        "p-2 rounded-md transition-all",
        currentTheme === themeName
          ? "bg-white text-black shadow-sm dark:bg-zinc-700 dark:text-white"
          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
      )}
      aria-label={label}
      aria-pressed={currentTheme === themeName}
    >
      <Icon size={18} />
    </button>
  );
};

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg border border-transparent dark:border-inherit">
      <ThemeButton
        themeName="system"
        currentTheme={theme}
        setTheme={setTheme}
        Icon={Monitor}
        label="Sistem Teması"
      />
      <ThemeButton
        themeName="dark"
        currentTheme={theme}
        setTheme={setTheme}
        Icon={Moon}
        label="Koyu Mod"
      />
      <ThemeButton
        themeName="light"
        currentTheme={theme}
        setTheme={setTheme}
        Icon={Sun}
        label="Açık Mod"
      />
    </div>
  );
};

export default ThemeToggleButton;
