"use client";
import { useEffect } from "react";
import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks";
import { FeedPaginator, PostList } from "@/components/common";
import { Alert } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import { useNewPost } from "@/contexts/NewPostPlaceholder";

const HomeFeed = () => {
  const postService = new PostService();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : undefined;

  const { posts: newPosts } = useNewPost();

  const {
    data: posts,
    loading,
    error,
    execute: fetchPosts,
  } = useApi((page?: number) => postService.getPosts(page));

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

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

  return (
    <>
      <PostList
        posts={
          newPosts.length > 0
            ? newPosts.concat(
                posts.filter(
                  (post) => !newPosts.some((newPost) => newPost.id === post.id)
                )
              )
            : posts
        }
      />
      <FeedPaginator nextDisabled={posts.length !== 50} />
    </>
  );
};

export default HomeFeed;
