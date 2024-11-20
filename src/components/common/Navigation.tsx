"use client";
import React from "react";
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
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  href: string;
  icon: LucideIcon;
  text: string;
  loginRequired?: boolean;
  onlyLargeScreen?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/",
    icon: Home,
    text: "Ana Sayfa",
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

const NavItem = ({
  href,
  icon: Icon,
  text,
  loginRequired,
  onlyLargeScreen,
}: NavItem) => {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-1 rounded-full sm:hover:bg-blue-50 px-4 py-2 sm:flex-row sm:gap-2 sm:justify-start lg:py-3 lg:pr-6 lg:gap-3",
        onlyLargeScreen && "hidden lg:flex",
        loginRequired && !isLoggedIn && "hidden",
        pathname === href && "text-blue-700"
      )}
    >
      <Icon size={24} />
      <span className="text-xs lg:text-base">{text}</span>
    </Link>
  );
};

export default function Navigation() {
  return (
    <nav
      className="
      fixed bottom-0 left-0 right-0 
      bg-white backdrop-blur-md	bg-opacity-50 border-t border-neutral-200
      h-16 flex items-center justify-around 
      px-4 
      z-50
      
      lg:sticky lg:clear-both lg:top-4 lg:h-full lg:w-64
      lg:h-full
      
      lg:bg-white lg:bg-opacity-100 lg:backdrop-blur-none
      lg:border-none lg:bg-transparent lg:p-4 lg:rounded-xl lg:shadow-sm
      lg:font-semibold text-neutral-800

      _lg:flex-1 lg:flex-col lg:items-start lg:justify-start lg:gap-1 lg:py-4
      "
    >
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}

      <button
        className="
      hidden lg:block w-full mt-2 font-extrabold
      rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-base text-center
      py-3"
      >
        {/* <Send className="inline-block mr-2" size={20} /> */}
        Paylaş
      </button>
    </nav>
  );
}
