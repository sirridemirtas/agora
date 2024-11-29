import { ThemeToggleButton } from "@/components/common";

export default function SettingsPage() {
  return (
    <div className="lg:flex-1 p-6">
      <div className="flex flex-row justify-between items-center border-b p-2">
        <label>Tema</label>
        <ThemeToggleButton />
      </div>
    </div>
  );
}
