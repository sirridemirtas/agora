"use client";
import { useParams } from "next/navigation";
import { universities } from "@/constants/universities";
import { MOCK_POSTS } from "@/constants/posts";
import { Card } from "@/components/ui";
import { Post } from "@/components/common";

export default function UniversityFeed() {
  const { slug } = useParams();
  const universityId = String(slug);

  const university = universities.find((u) => u.id === universityId);

  if (!university) {
    return (
      <div className="lg:flex-1">
        <Card>Üniversite bulunamadı.</Card>
      </div>
    );
  }

  const filteredPosts = MOCK_POSTS.filter(
    (post) => post.universityId === universityId
  );

  return (
    <div>
      <div className="sm:space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <Card>
            <p>{university.name} için henüz gönderi bulunmuyor.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
