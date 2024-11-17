"use client";
import {
  Bell,
  Home,
  School,
  User,
  Mail,
  Settings,
  MessageSquareWarning,
} from "lucide-react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import React from "react";

const Icon = ({ icon }: { icon: React.ReactElement }) => {
  return <>{React.cloneElement(icon, { size: 24 })}</>;
};

const navItems = [
  {
    href: "/",
    icon: <Icon icon={<Home />} />,
    text: "Ana Sayfa",
  },
  {
    href: "/university",
    icon: <Icon icon={<School />} />,
    text: "Üniversite",
  },
  {
    href: "/notifications",
    icon: <Icon icon={<Bell />} />,
    text: "Bildirimler",
  },
  {
    href: "/messages",
    icon: <Icon icon={<Mail />} />,
    text: "Mesajlar",
  },
  {
    href: "/profile",
    icon: <Icon icon={<User />} />,
    text: "Profil",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  const NavItem = ({
    href,
    icon,
    text,
    className,
  }: {
    href: string;
    icon: React.ReactNode;
    text: string;
    className?: string;
  }) => {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center gap-1 rounded-full sm:hover:bg-blue-50 px-4 py-2 sm:flex-row sm:gap-2 sm:justify-start lg:py-3 lg:pr-6 lg:gap-3",
          pathname === href && "text-blue-700",
          className
        )}
      >
        {icon}
        <span className="text-xs lg:text-base">{text}</span>
      </Link>
    );
  };

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

      <NavItem
        className="hidden lg:flex"
        key={"/settings"}
        href={"/settings"}
        icon={<Icon icon={<Settings />} />}
        text={"Ayarlar"}
      />
      <NavItem
        className="hidden lg:flex"
        key={"/contact"}
        href={"/contact"}
        icon={<Icon icon={<MessageSquareWarning />} />}
        text={"Destek"}
      />

      <button
        className="
      hidden lg:block w-full mt-2 font-extrabold
      rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-base text-center
      py-3"
      >
        Paylaş
      </button>
    </nav>
  );
}
