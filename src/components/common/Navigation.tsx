"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
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
//import { Logo } from "@/components/common";

interface NavItem {
  href: string;
  icon: LucideIcon;
  text: string;
  loginRequired?: boolean;
  onlyLargeScreen?: boolean;
  hideOnLogin?: boolean;
}

export const navItems: NavItem[] = [
  {
    href: "/",
    icon: Home,
    text: "Anasayfa",
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
    href: "/university/115069",
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
    onlyLargeScreen: false,
    loginRequired: false,
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
      className={clsx(
        "flex flex-col items-center gap-1 rounded-full",
        "px-4 py-2 transition-all sm:hover:bg-neutral-100",
        "sm:flex-row sm:justify-start sm:gap-2 lg:gap-3 lg:py-3 lg:pr-6",
        "outline-none focus-visible:ring-2 focus-visible:ring-neutral-600",
        "sm:active:bg-neutral-200",
        onlyLargeScreen && "hidden lg:flex",
        pathname === href && "sm:bg-neutral-100"
      )}
    >
      <Icon size={24} />
      <span className={"truncate text-xs lg:text-base"}>{text}</span>
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
      className={clsx(
        "fixed bottom-0 left-0 right-0",
        "z-10 flex h-16 items-center justify-around px-4",

        "border-t bg-neutral-50 bg-opacity-80 backdrop-blur-md",
        "md:border-none md:bg-opacity-100 md:backdrop-blur-none",

        // Large screen styles
        "lg:bg-white lg:shadow-sm",
        "lg:rounded-xl lg:border-none",
        "text-neutral-800 lg:font-semibold",
        "lg:relative lg:h-auto lg:w-64",
        "lg:flex-col lg:items-start lg:justify-start lg:gap-1 lg:p-4 lg:pt-6",
        "dark:bg-neutral-950 dark:shadow-none dark:lg:border dark:lg:border-neutral-100"
      )}
    >
      {/* <Logo className="hidden lg:block ml-1 mb-4" /> */}

      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}

      {isLoggedIn && (
        <div className="mt-auto hidden w-full space-y-2 lg:block">
          <button
            onClick={handleShare}
            className={clsx(
              "mt-4 w-full py-3 font-extrabold",
              "rounded-full bg-gray-100 text-black outline-none",
              "text-center text-base transition-colors duration-300",
              "hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 active:bg-gray-300"
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
