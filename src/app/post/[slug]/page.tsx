"use client";
import { Post } from "@/components/common";

export default function PostPage() {
  return (
    <div className="lg:flex-1">
      <div className="max-w-4xl mx-auto">
        <Post
          {...{
            id: "3",
            content:
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
            timestamp: "2024-01-05T16:45:00Z",
            university: "Orta Doğu Teknik Üniversitesi",
            universityId: "122571",
            username: "techStudent",
            upvotes: 56,
            downvotes: 4,
            commentsCount: 12,
            isPrivate: false,
          }}
        />
      </div>
    </div>
  );
}
