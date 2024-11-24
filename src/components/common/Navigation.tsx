"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import {
  LucideIcon,
  Bell,
  Home,
  School,
  User,
  Mail,
  Settings,
  MessageSquareWarning,
  LogIn,
  SquarePen,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/common";

interface NavItem {
  href: string;
  icon: LucideIcon;
  text: string;
  loginRequired?: boolean;
  onlyLargeScreen?: boolean;
  hideOnLogin?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/",
    icon: Home,
    text: "Ana Sayfa",
  },
  {
    href: "/login",
    icon: LogIn,
    text: "Giriş Yap",
    hideOnLogin: true,
  },
  {
    href: "/register",
    icon: SquarePen,
    text: "Kayıt Ol",
    hideOnLogin: true,
  },
  {
    href: "/university",
    icon: School,
    text: "Üniversite",
    loginRequired: true,
  },
  {
    href: "/notifications",
    icon: Bell,
    text: "Bildirimler",
    loginRequired: true,
  },
  {
    href: "/messages",
    icon: Mail,
    text: "Mesajlar",
    loginRequired: true,
  },
  {
    href: "/profile",
    icon: User,
    text: "Profil",
    loginRequired: true,
  },
  {
    href: "/settings",
    icon: Settings,
    text: "Ayarlar",
    onlyLargeScreen: true,
    loginRequired: true,
  },
  {
    href: "/contact",
    icon: MessageSquareWarning,
    text: "Destek",
    onlyLargeScreen: true,
  },
];

const NavItem: React.FC<NavItem> = ({
  href,
  icon: Icon,
  text,
  hideOnLogin,
  loginRequired,
  onlyLargeScreen,
}) => {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  // Hide item if it should be hidden for logged-in users
  // or requires login but user isn't logged in
  if ((hideOnLogin && isLoggedIn) || (loginRequired && !isLoggedIn)) {
    return null;
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 rounded-full",
        "sm:hover:bg-neutral-100 px-4 py-2 transition-all",
        "sm:flex-row sm:gap-2 sm:justify-start lg:py-3 lg:pr-6 lg:gap-3",
        "outline-none focus-visible:ring-2 focus-visible:ring-neutral-600",
        "sm:active:bg-neutral-200",
        onlyLargeScreen && "hidden lg:flex",
        pathname === href && "sm:bg-neutral-100"
      )}
    >
      <Icon size={24} />
      <span className={"text-xs lg:text-base"}>{text}</span>
    </Link>
  );
};

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  const handleShare = () => {
    console.log("Share button clicked");
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0",
        //"bg-white backdrop-blur-md bg-opacity-50 border-t border-neutral-200",
        "bg-white border-t border-neutral-200",
        "h-16 flex items-center justify-around",
        "px-4 z-50",

        // Large screen styles
        "lg:sticky lg:top-4 lg:h-full lg:w-64",
        "lg:bg-white lg:bg-opacity-100 lg:backdrop-blur-none",
        "lg:border-none lg:bg-transparent lg:p-4 lg:rounded-xl lg:shadow-sm",
        "lg:font-semibold text-neutral-800",
        "lg:flex-col lg:items-start lg:justify-start lg:gap-1 lg:py-4"
      )}
    >
      <Logo className="hidden lg:block ml-1 mb-4" />

      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}

      {isLoggedIn && (
        <div className="hidden lg:block w-full mt-auto space-y-2">
          <button
            onClick={handleShare}
            className={cn(
              "w-full font-extrabold py-3 mt-4",
              "rounded-full text-black bg-gray-100 outline-none",
              "text-base text-center transition-colors duration-300",
              "hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-600"
            )}
          >
            Paylaş
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
