"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/AuthService";
import { useApi } from "@/hooks/useApi";

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
  const authService = new AuthService();

  const { loading, execute: executeLogout } = useApi(
    authService.logout.bind(authService)
  );

  const handleLogout = async () => {
    const response = await executeLogout();

    if (!response.error) {
      // Only logout locally if the API call was successful
      logout();
      router.push("/");
    } else {
      console.error("Logout failed:", response.error);
      // If server logout fails but we want to logout locally anyway
      // logout();
      // router.push("/");
    }
  };

  const content = (
    <>
      {showIcon && <LogOut className="mr-2 h-5 w-5" />}
      <span>
        {
          //loading ? "Çıkış yapılıyor..." : "Çıkış Yap"
          "Çıkış Yap"
        }
      </span>
    </>
  );

  const defaultClasses =
    "flex items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-300 transition-colors";

  if (asLink) {
    return (
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (!loading) handleLogout();
        }}
        className={`${defaultClasses} ${className} ${loading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`${defaultClasses} ${className} ${loading ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {content}
    </button>
  );
};

export default LogOutButton;
