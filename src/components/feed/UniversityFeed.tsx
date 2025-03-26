"use client";
import { usePathname } from "next/navigation";
import { School } from "lucide-react";
import { universities } from "@/constants/universities";
import { CreatePost } from "@/components/common";
import { PostService } from "@/services/PostService";
import BaseFeed from "./BaseFeed";
import { Post } from "@/types";

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
  const pathname = usePathname();
  const universityId = pathname.split("/")[2];
  const postService = new PostService();

  const university = universities.find((u) => u.id === universityId);

  if (!university) {
    return <UniversityNotFound />;
  }

  // Filter function to only show new posts for this university
  const filterNewPosts = (posts: Post[]) => {
    return posts.filter((post) => post.universityId === universityId);
  };

  return (
    <div>
      <CreatePost />
      <BaseFeed
        fetchFunction={(page) =>
          postService.getUniversityPosts(universityId, page)
        }
        emptyTitle={`${university.name} için henüz gönderi paylaşılmamış`}
        emptyMessage="Kullanıcılar gönderi paylaşınca burada görünecek."
        filterNewPosts={filterNewPosts}
      />
    </div>
  );
}
