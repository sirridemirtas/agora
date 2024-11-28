"use client";
import { useParams } from "next/navigation";
import { universities } from "@/constants/universities";
import { MOCK_POSTS } from "@/constants/posts";
import { FeedFilters, Post } from "@/components/common";

export default function UniversityFeed() {
  const { slug } = useParams();
  const universityId = String(slug);

  const university = universities.find((u) => u.id === universityId);

  if (!university) {
    return <div className="lg:flex-1">Üniversite bulunamadı</div>;
  }

  const filteredPosts = MOCK_POSTS.filter(
    (post) => post.universityId === universityId
  );

  return (
    <div>
      <div className="sm:space-y-4">
        <FeedFilters />
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Post key={post.id} {...post} />)
        ) : (
          <p>{university.name} için henüz gönderi bulunmuyor.</p>
        )}
      </div>
    </div>
  );
}
