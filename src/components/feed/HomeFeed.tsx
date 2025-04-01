"use client";
import { PostService } from "@/services/PostService";
import BaseFeed from "./BaseFeed";

const HomeFeed = () => {
  const postService = new PostService();

  return (
    <BaseFeed
      fetchFunction={(page) => postService.getHomeFeed(page)}
      emptyTitle="Bu sayfada henüz gönderi paylaşılmamış"
      emptyMessage="Kullanıcılar gönderi paylaşınca burada görünecek."
    />
  );
};

export default HomeFeed;
