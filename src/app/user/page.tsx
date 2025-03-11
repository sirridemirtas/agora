"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { usePageTitle } from "@/hooks/usePageTitle";
import { Post } from "@/components/common";
import { MOCK_POSTS } from "@/constants/posts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfileNotFound = () => {
  return (
    <div className="lg:flex-1">
      <div className="p-8 py-16 text-center">
        <div className="mb-4 flex justify-center">
          <User size={48} className="text-neutral-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Böyle bir kullanıcı yok</h2>
        <p className="text-neutral-500">Ya da yanlış yönlendirildiniz.</p>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  const router = useRouter();
  if (!isLoggedIn) router.push("/login");

  const pathname = usePathname();
  // /@:username
  const username = pathname.split("/")[1].substring(1);
  console.log(username);

  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle("@" + username);
  }, [username, setTitle]);

  const MOCK_USER_POSTS = MOCK_POSTS.filter(
    (post) => post.username === "user123"
  );

  if (!MOCK_USER_POSTS.length) {
    return <ProfileNotFound />;
  }

  return (
    <div className="lg:flex-1">
      <div className="p-6 sm:mb-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">johndoe</h1>
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

      <div className="sm:space-y-4">
        {MOCK_USER_POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
