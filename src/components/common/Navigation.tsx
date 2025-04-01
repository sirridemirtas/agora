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
import { useAuth } from "@/hooks";
import Avatar from "./Avatar";
import { useNotifications } from "@/hooks/useNotifications";

interface NavItem {
  href: string;
  icon: LucideIcon;
  text: string;
  loginRequired?: boolean;
  onlyLargeScreen?: boolean;
  hideOnLogin?: boolean;
  className?: string;
}

export const navItems: NavItem[] = [
  {
    href: "/",
    icon: Home,
    text: "Anasayfa",
  },
  {
    href: "/university",
    icon: School,
    text: "Üniversite",
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
    href: "/settings",
    icon: Settings,
    text: "Ayarlar",
    onlyLargeScreen: true,
    loginRequired: false,
  },
  {
    href: "/contact",
    icon: MessageSquareWarning,
    text: "Destek",
    //onlyLargeScreen: true,
  },
  {
    href: "/user",
    icon: User,
    text: "Profil",
    loginRequired: true,
  },
];

const NavItem: React.FC<NavItem> = ({
  href,
  icon: Icon,
  text,
  hideOnLogin,
  loginRequired,
  onlyLargeScreen,
  className,
}) => {
  const pathname = usePathname();
  const { isLoggedIn, universityId, username } = useAuth();
  const { notificationCount, unreadMessageCount } = useNotifications();

  // Update these variables to use the values from the context
  const notifications = notificationCount;
  const unreadCount = unreadMessageCount;

  // Hide item if it should be hidden for logged-in users
  // or requires login but user isn't logged in
  if ((hideOnLogin && isLoggedIn) || (loginRequired && !isLoggedIn)) {
    return null;
  }

  const activeStyles =
    "sm:bg-neutral-100 dark:text-white sm:dark:bg-neutral-800";

  const Badge = ({ n }: { n: number }) => (
    <span
      className={clsx(
        "absolute -mt-1 ml-4 flex items-center justify-center px-[3px] text-[0.5em] sm:-mt-4",
        "rounded-full border border-white bg-red-500 font-light text-white dark:border-neutral-300"
      )}
    >
      {n}
    </span>
  );

  return (
    <Link
      href={
        href === "/university"
          ? href + (universityId ? `/${universityId}` : "")
          : href === "/user"
            ? "/@" + username
            : href
      }
      className={clsx(
        // Base styles
        "flex flex-col items-center gap-1 px-1 py-2 transition-all",

        // Small screen hover & active states
        "sm:hover:bg-neutral-100 sm:dark:hover:bg-neutral-800 sm:dark:hover:text-white",
        "sm:active:bg-neutral-200",

        // Small to large screen layout
        "sm:flex-row sm:justify-start sm:gap-2 sm:rounded-full sm:px-4 lg:gap-3 lg:py-3 lg:pr-6",

        // Focus styles
        "outline-none focus-visible:ring-2 focus-visible:ring-neutral-600",

        // Conditional visibility
        onlyLargeScreen && "hidden lg:flex",

        // Active state based on pathname
        pathname === href && activeStyles,

        pathname.startsWith("/@" + username) &&
          href === "/user" &&
          activeStyles,

        pathname.startsWith("/university") &&
          href === "/university" &&
          activeStyles,

        href === "/user" && "sm:py-1 lg:gap-[0.5rem] lg:px-3 lg:py-[0.5rem]",
        className
      )}
      title={
        href === "/university"
          ? "Üniversite"
          : href === "/user"
            ? (username && "@" + username) || "Profil"
            : text
      }
    >
      {href === "/user" ? (
        <div className="flex h-6 w-6 items-stretch justify-stretch rounded-full border sm:h-8 sm:w-8 sm:border-none">
          {username ? <Avatar username={username} /> : <Avatar />}
        </div>
      ) : (
        <Icon size={24} />
      )}
      <span className="truncate text-xs lg:text-base">
        {href === "/user" ? (
          <>
            {username && username.length < 10 ? (
              <>
                <span className="opacity-60">@</span>
                {username && username.slice(0, 8)}
              </>
            ) : (
              text
            )}
          </>
        ) : (
          text
        )}
      </span>
      {notifications > 0 && href === "/notifications" && (
        <Badge n={notifications} />
      )}
      {unreadCount > 0 && href === "/messages" && <Badge n={unreadCount} />}
    </Link>
  );
};

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  /* const handleShare = () => {
    console.log("Share button clicked");
  }; */

  return (
    <nav
      className={clsx(
        // Base styles
        "fixed bottom-0 left-0 right-0 z-10 flex h-16 w-full items-center justify-around",
        "border-t bg-neutral-50 bg-opacity-80 px-0 backdrop-blur-md",

        // Medium screen styles
        "md:bg-opacity-100 md:backdrop-blur-none",

        // Large screen styles
        "lg:relative lg:h-auto lg:w-64 lg:flex-col lg:items-start lg:justify-start lg:px-4",
        "lg:gap-1 lg:rounded-xl lg:bg-white lg:p-4 lg:pt-6 lg:font-semibold lg:shadow-sm",
        "lg:border lg:border-transparent",

        // Dark mode styles
        "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300 dark:shadow-none",
        "dark:lg:border dark:lg:border-neutral-800"
      )}
    >
      {/* <Logo className="hidden lg:block ml-1 mb-4" /> */}

      {navItems.map((item) => (
        <NavItem
          key={item.href}
          {...item}
          className={clsx(
            "flex-1 flex-shrink-0 sm:flex-initial",
            item.href === "/contact" && isLoggedIn && "hidden lg:flex"
          )}
        />
      ))}
      {/*  {isLoggedIn && <Avatar size={8} username="anonim" />} */}

      {/* isLoggedIn && (
        <div className="mt-auto hidden w-full space-y-2 lg:block">
          <button
            onClick={handleShare}
            className={clsx(
              "mt-4 w-full rounded-full py-3 text-center text-base font-extrabold outline-none transition-colors duration-300",
              "bg-gray-100 text-black hover:bg-gray-200 active:bg-gray-300",
              "dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:active:bg-neutral-600",
              "focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-400"
            )}
          >
            Paylaş
          </button>
        </div>
      ) */}
    </nav>
  );
};

export default Navigation;
