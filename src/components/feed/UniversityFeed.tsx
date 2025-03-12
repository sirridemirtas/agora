"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { School } from "lucide-react";
import { universities } from "@/constants/universities";
import { FeedFilters, PostList } from "@/components/common";
import { Alert, Loader } from "@/components/ui";
import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks/useApi";

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

  const {
    data: posts,
    loading,
    error,
    execute: fetchUniversityPosts,
  } = useApi(() => postService.getUniversityPosts(universityId));

  useEffect(() => {
    if (universityId) {
      fetchUniversityPosts();
    }
  }, [universityId]);

  const university = universities.find((u) => u.id === universityId);

  if (!university) {
    return <UniversityNotFound />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="pt-6">
        <Alert
          type="error"
          title="Gönderiler alınırken bir hata oluştu!"
          message={error.message}
          className="mx-6"
        />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="pt-6">
        <Alert
          type="info"
          title={`${university.name} için henüz gönderi paylaşılmamış`}
          message={"Kullanıcılar gönderi paylaşınca burada görünecek."}
          className="mx-6"
        />
      </div>
    );
  }

  return (
    <div>
      <FeedFilters className="mb-4" />
      <PostList posts={posts} />
    </div>
  );
}
