import { School } from "lucide-react";
import { CreatePost, PageTitle, Post } from "@/components/common";

const MOCK_POSTS = [
  {
    id: "1",
    content: "Kütüphanede sessiz çalışma alanları yetersiz kalıyor.",
    timestamp: "2024-03-10T15:30:00Z",
    university: "İstanbul Üniversitesi",
    username: "johndoe",
    upvotes: 42,
    downvotes: 3,
    commentsCount: 12,
    isPrivate: false,
  },
  {
    id: "2",
    content: "Kütüphanede sessiz çalışma alanları yetersiz kalıyor.",
    timestamp: "2024-03-10T15:30:00Z",
    university: "İstanbul Üniversitesi",
    username: "johndoe",
    upvotes: 42,
    downvotes: 3,
    commentsCount: 12,
    isPrivate: false,
  },
];

export default function UniversityPage() {
  return (
    <div className="lg:flex-1">
      <PageTitle icon={School} title="İstanbul Üniversitesi" />
      <CreatePost />
      <div className="sm:space-y-4">
        {MOCK_POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
