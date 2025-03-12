"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileFeed from "@/components/feed/ProfileFeed";

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Extract username from /@username format
  const username = pathname.startsWith("/@")
    ? pathname.substring(2)
    : pathname.split("/")[1].substring(1);

  const { setTitle } = usePageTitle();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    setTitle("@" + username);
  }, [username, setTitle]);

  return (
    <div className="lg:flex-1">
      <div className="p-6 sm:mb-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">@{username}</h1>
          <Link
            href="/settings"
            className="text-neutral-500 hover:text-neutral-700"
          >
            <Settings size={20} />
          </Link>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-neutral-500">
          <span>İstanbul Üniversitesi</span>
        </div>
      </div>
      <ProfileFeed username={username} />
    </div>
  );
}
