"use client";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Post } from "@/components/common";
import { MOCK_POSTS } from "@/constants/posts";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();

  const router = useRouter();
  if (!isLoggedIn) router.push("/login");

  const MOCK_USER_POSTS = MOCK_POSTS.filter(
    (post) => post.username === "user123"
  );

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
