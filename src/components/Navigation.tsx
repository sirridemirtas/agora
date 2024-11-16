"use client";
import { MessageSquare, Bell, Home, School, User } from "lucide-react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    icon: <Home size={24} />,
    text: "Ana Sayfa",
  },
  {
    href: "/university",
    icon: <School size={24} />,
    text: "Üniversite",
  },
  {
    href: "/notifications",
    icon: <Bell size={24} />,
    text: "Bildirimler",
  },
  {
    href: "/messages",
    icon: <MessageSquare size={24} />,
    text: "Mesajlar",
  },
  {
    href: "/profile",
    icon: <User size={24} />,
    text: "Profil",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  const NavItem = ({
    href,
    icon,
    text,
  }: {
    href: string;
    icon: React.ReactNode;
    text: string;
  }) => {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center gap-1 sm:flex-row sm:gap-2 sm:justify-start",
          pathname === href && "text-blue-800"
        )}
      >
        {icon}
        <span className="text-xs">{text}</span>
      </Link>
    );
  };

  return (
    <nav
      className="
      fixed bottom-0 left-0 right-0 
      bg-white border-t
      h-16 flex items-center justify-around 
      px-4 
      z-50
      "
      data-class="sm:fixed sm:left-0 sm:top-0 sm:bottom-0 sm:w-32 sm:z-50
      sm:border-t-0 sm:bg-transparent sm:px-0
      sm:flex-col sm:items-start sm:justify-start sm:gap-4 sm:py-4
      sm:h-full
      "
    >
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
