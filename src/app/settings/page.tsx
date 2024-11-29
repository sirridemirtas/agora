import { ThemeToggleButton } from "@/components/common";

export default function SettingsPage() {
  return (
    <div className="p-6 lg:flex-1">
      <div className="flex flex-row items-center justify-between border-b p-2 dark:border-neutral-800">
        <label>Tema</label>
        <ThemeToggleButton />
      </div>
    </div>
  );
}
