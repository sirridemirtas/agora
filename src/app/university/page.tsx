import CreatePost from "@/components/CreatePost";
import Post from "@/components/Post";
import UniversityHeader from "@/components/UniversityHeader";

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
];

export default function UniversityPage() {
  return (
    <div className="max-w-xl mx-auto">
      <UniversityHeader university="İstanbul Üniversitesi" />
      <CreatePost />
      <div className="space-y-4">
        {MOCK_POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
