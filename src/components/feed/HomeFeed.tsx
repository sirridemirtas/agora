"use client";
import { useEffect } from "react";
import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks/useApi";
import { PostList } from "@/components/common";
import { Alert } from "@/components/ui";

const HomeFeed = () => {
  const postService = new PostService();

  const {
    data: posts,
    loading,
    error,
    execute: fetchPosts,
  } = useApi(postService.getPosts.bind(postService));

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <Alert
        type="error"
        title="Gönderiler alınırken bir hata oluştu!"
        message={error.message}
        className="mx-6"
      />
    );
  }

  if (!posts?.length) {
    return (
      <Alert
        type="info"
        title="Bu sayfada henüz gönderi paylaşılmamış"
        message={"Kullanıcılar gönderi paylaşınca burada görünecek."}
        className="mx-6"
      />
    );
  }

  return <PostList posts={posts} />;
};

export default HomeFeed;
