"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface LogOutButtonProps {
  showIcon?: boolean;
  asLink?: boolean;
  className?: string;
}

const LogOutButton: React.FC<LogOutButtonProps> = ({
  showIcon = false,
  asLink = false,
  className = "",
}) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const content = (
    <>
      {showIcon && <LogOut className="w-5 h-5 mr-2" />}
      <span>Çıkış Yap</span>
    </>
  );

  const defaultClasses =
    "flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors";

  if (asLink) {
    return (
      <Link
        href="#"
        onClick={handleLogout}
        className={`${defaultClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button onClick={handleLogout} className={`${defaultClasses} ${className}`}>
      {content}
    </button>
  );
};

export default LogOutButton;
