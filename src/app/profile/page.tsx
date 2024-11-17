import { Settings } from "lucide-react";
import Link from "next/link";
import Post from "@/components/Post";

const MOCK_USER_POSTS = [
  {
    id: "1",
    content: "Kampüste yeni açılan kafeterya harika!",
    timestamp: "2024-03-10T16:45:00Z",
    university: "İstanbul Üniversitesi",
    username: "kampus123",
    upvotes: 18,
    downvotes: 1,
    commentsCount: 5,
    isPrivate: false,
  },
];

export default function ProfilePage() {
  return (
    <div className="lg:flex-1">
      <div className="bg-white sm:rounded-xl p-6 sm:shadow-sm sm:mb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">kampus123</h1>
          <Link
            href="/profile/settings"
            className="text-neutral-500 hover:text-neutral-700"
          >
            <Settings size={20} />
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span>İstanbul Üniversitesi</span>
          <span>Açık Mod</span>
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
