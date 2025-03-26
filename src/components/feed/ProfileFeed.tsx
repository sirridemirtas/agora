"use client";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks";
import { FeedPaginator, PostList } from "@/components/common";
import { Alert, Loader } from "@/components/ui";
import { PAGE_SIZE } from "@/constants";

interface ProfileFeedProps {
  username?: string;
}

const ProfileFeed = ({ username: propUsername }: ProfileFeedProps) => {
  const params = useParams();
  const searchParams = useSearchParams();
  // Use prop username if provided, otherwise try to get it from params
  const username = propUsername || (params?.username as string);
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : undefined;
  const postService = new PostService();

  const {
    data: posts,
    loading,
    error,
    execute: fetchUserPosts,
  } = useApi(() => postService.getUserPosts(username, page));

  useEffect(() => {
    if (username) {
      fetchUserPosts();
    }
  }, [username, page]);

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
          title={`${username} henüz gönderi paylaşmamış`}
          message={"Kullanıcı gönderi paylaşınca burada görünecek."}
          className="mx-6"
        />
      </div>
    );
  }

  return (
    <>
      <PostList posts={posts} />
      <FeedPaginator nextDisabled={posts.length !== PAGE_SIZE} />
    </>
  );
};

export default ProfileFeed;
