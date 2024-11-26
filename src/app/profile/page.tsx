import { Settings } from "lucide-react";
import Link from "next/link";
import { LogOutButton, Post } from "@/components/common";
import { MOCK_POSTS } from "@/constants/posts";

export default function ProfilePage() {
  const MOCK_USER_POSTS = MOCK_POSTS.filter(
    (post) => post.username === "user123"
  );
  return (
    <div className="lg:flex-1">
      <div className="bg-white sm:rounded-xl p-6 sm:shadow-sm sm:mb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">johndoe</h1>
          <Link
            href="/settings"
            className="text-neutral-500 hover:text-neutral-700"
          >
            <Settings size={20} />
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-500 justify-between ">
          <span>İstanbul Üniversitesi</span>
          <LogOutButton asLink />
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
