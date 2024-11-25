"use client";

import { useParams } from "next/navigation";
import { School } from "lucide-react";
import { PageTitle, CreatePost, Post } from "@/components/common";
import { universities } from "@/constants/universities";
import { MOCK_POSTS } from "@/constants/posts";
import { Card } from "@/components/ui";

export default function UniversityPage() {
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
    <div className="lg:flex-1">
      <PageTitle icon={School} title={university.name} />
      <CreatePost />
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
