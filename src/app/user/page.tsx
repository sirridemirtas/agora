"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { School, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";
//import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileFeed from "@/components/feed/ProfileFeed";
import { universities } from "@/constants/universities";
import { Avatar } from "@/components/common";

export default function ProfilePage() {
  const { /* isLoggedIn, */ universityId } = useAuth();
  //const router = useRouter();
  const pathname = usePathname();

  // Extract username from /@username format
  const username = pathname.startsWith("/@")
    ? pathname.substring(2)
    : pathname.split("/")[1].substring(1);

  const { setTitle } = usePageTitle();

  /* useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]); */

  useEffect(() => {
    setTitle("@" + username);
  }, [username, setTitle]);

  return (
    <div className="lg:flex-1">
      <div className="p-6 sm:mb-4">
        <div className="flex items-start gap-4">
          <Avatar username={username} />

          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                <span className="font-normal text-neutral-500">@</span>
                {username}
              </h1>
              <Link
                href="/settings"
                className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
              >
                <Settings size={18} />
              </Link>
            </div>

            <div className="flex items-center">
              <Link
                href={`/university/${universityId}`}
                className="inline-flex items-center text-sm text-neutral-500"
              >
                <div className="mr-1.5 h-4 w-4">
                  <School size={16} />
                </div>
                {universityId && (
                  <span className="hover:underline">
                    {universities.filter((u) => u.id === universityId)[0].name}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ProfileFeed username={username} />
    </div>
  );
}
