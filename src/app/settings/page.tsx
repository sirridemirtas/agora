"use client";
import { useEffect } from "react";
import { usePageTitle } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import {
  LogOutButton,
  ThemeToggleButton,
  ToggleProfilePrivacy,
} from "@/components/common";
import { AvatarEditor } from "@/components/form";

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
    <div className="flex min-h-16 w-full flex-row items-center justify-between border-b p-2 dark:border-neutral-800">
      <div className="flex flex-col justify-between">
        <label>{label}</label>
        {helperText && (
          <span className="w-full flex-1 pt-1 text-sm text-neutral-500">
            {helperText}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

function Settings() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <Setting label="Tema" helperText="Bu ayar cihazınızda saklanır.">
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
          <Setting label="Avatar">
            <Link
              href="/settings/avatar"
              className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 transition-colors dark:text-gray-300"
            >
              Değiştir
            </Link>
          </Setting>
          <Setting label="Oturum">
            <LogOutButton /* asLink */ />
          </Setting>
        </>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const pathname = usePathname();
  const path = pathname.split("/")[2];

  const { setTitle } = usePageTitle();

  useEffect(() => {
    if (path == "avatar") setTitle("Avatarı Düzenle");
  }, [setTitle]);

  return (
    <div className="p-6 lg:flex-1">
      {path === "avatar" ? <AvatarEditor /> : <Settings />}
    </div>
  );
}
