"use client";
import { MessageSquare, Bell, Home, School, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex items-center justify-around px-4 md:px-0 z-50">
      <Link href="/" className="flex flex-col items-center gap-1">
        <Home size={24} />
        <span className="text-xs">Ana Sayfa</span>
      </Link>
      <Link href="/university" className="flex flex-col items-center gap-1">
        <School
          size={24}
          className={
            pathname === "/university" ? "text-blue-500" : "text-neutral-500"
          }
        />
        <span className="text-xs">Üniversite</span>
      </Link>
      <Link href="/notifications" className="flex flex-col items-center gap-1">
        <Bell size={24} />
        <span className="text-xs">Bildirimler</span>
      </Link>
      <Link href="/messages" className="flex flex-col items-center gap-1">
        <MessageSquare size={24} />
        <span className="text-xs">Mesajlar</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-1">
        <User size={24} />
        <span className="text-xs">Profil</span>
      </Link>
    </nav>
  );
}
