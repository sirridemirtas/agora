"use client";
import { useAuth } from "@/hooks/useAuth";
import { LogOutButton, ThemeToggleButton } from "@/components/common";

const Setting = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row items-center justify-between border-b p-2 dark:border-neutral-800">
      {children}
    </div>
  );
};

export default function SettingsPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="p-6 lg:flex-1">
      <Setting>
        <label>Tema</label>
        <ThemeToggleButton />
      </Setting>
      {isLoggedIn && (
        <Setting>
          <label>Oturum</label>
          <LogOutButton /* asLink */ />
        </Setting>
      )}
    </div>
  );
}
