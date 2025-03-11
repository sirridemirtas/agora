"use client";
import { useSearchParams } from "next/navigation";
import { School } from "lucide-react";
import { universities } from "@/constants/universities";
import { MOCK_POSTS } from "@/constants/posts";
import { FeedFilters, Post } from "@/components/common";

const UniversityNotFound = () => {
  return (
    <div className="lg:flex-1">
      <div className="p-8 py-16 text-center">
        <div className="mb-4 flex justify-center">
          <School size={48} className="text-neutral-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Böyle bir üniversite yok</h2>
        <p className="text-neutral-500">Ya da yanlış yönlendirildiniz.</p>
      </div>
    </div>
  );
};

export default function UniversityFeed() {
  //const params = useParams();
  //const slug = params?.slug;
  //const universityId =typeof slug === "string" ? slug : Array.isArray(slug) ? slug[0] : "";
  // ?universityId=1
  const params = useSearchParams();
  const universityId = params.get("universityId");

  const university = universities.find((u) => u.id === universityId);

  if (!university) {
    return <UniversityNotFound />;
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
