"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  LogOutButton,
  ThemeToggleButton,
  ToggleProfilePrivacy,
} from "@/components/common";

const Setting = ({
  children,
  label,
  helperText,
}: {
  children: React.ReactNode;
  label: string;
  helperText?: string;
}) => {
  return (
    <div className="flex min-h-16 w-full flex-col justify-center border-b p-2 dark:border-neutral-800">
      <div className="flex flex-row items-center justify-between">
        <label>{label}</label>
        {children}
      </div>
      {helperText && (
        <span className="w-full flex-1 pt-1 text-sm text-neutral-500">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default function SettingsPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="p-6 lg:flex-1">
      <Setting label="Tema">
        <ThemeToggleButton />
      </Setting>
      {isLoggedIn && (
        <>
          <Setting
            label="Profil Gizliliği"
            helperText="Açık konumdayken profiliniz görüntülenemez, gönderilerde isminiz ve avatarınız gösterilmez."
          >
            <ToggleProfilePrivacy />
          </Setting>
          <Setting label="Oturum">
            <LogOutButton /* asLink */ />
          </Setting>
        </>
      )}
    </div>
  );
}
