"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";

import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks";

import { PostList } from "@/components/common";
import { Alert } from "@/components/ui";

import { useNewPost } from "@/contexts/NewPostPlaceholder";

interface RepliesProps {
  postId: string;
}

export const Replies = ({ postId }: RepliesProps) => {
  const postService = new PostService();
  const { loading, data, execute } = useApi(
    postService.getPostReplies.bind(postService, postId)
  );

  const { posts: newPosts } = useNewPost();

  useEffect(() => {
    if (postId) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const replies = data || [];

  return (
    <div className="">
      {loading ? (
        <div className="p-4 text-center">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-neutral-300" />
        </div>
      ) : replies.length > 0 ? (
        <PostList posts={newPosts.concat(replies)} />
      ) : (
        <div className="px-6">
          {" "}
          <Alert
            type="info"
            title="Bu gönderiye henüz cevap yazılmamış"
            message="Tüm cevaplar burada görünecek."
          />
        </div>
      )}
    </div>
  );
};

export default Replies;
