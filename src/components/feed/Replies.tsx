"use client";
import { useEffect, useState, useCallback } from "react";
import { LoaderCircle } from "lucide-react";
import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks";
import { FeedPaginator, PostList } from "@/components/common";
import { Alert } from "@/components/ui";
import { useNewPost } from "@/contexts/NewPostPlaceholder";
import { Post } from "@/types";
import { PAGE_SIZE } from "@/constants";
import { useSearchParams } from "next/navigation";

interface RepliesProps {
  postId: string;
}

export const Replies = ({ postId }: RepliesProps) => {
  const postService = new PostService();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : undefined;

  const fetchReplies = useCallback(() => {
    return postService.getPostReplies(postId, page);
  }, [postId, page]);

  const { loading, data, execute } = useApi(fetchReplies);
  const { posts: newPosts } = useNewPost();
  const [replies, setReplies] = useState<Post[]>([]);

  // API verilerini almak için
  useEffect(() => {
    if (postId) {
      execute();
    }
  }, [postId, page, execute]);

  // API verisi geldiğinde replies'ı güncelle
  useEffect(() => {
    if (data) {
      setReplies(data);
    }
  }, [data]);

  // Yeni postlar geldiğinde replies'ı güncelle, yinelenenleri önle
  useEffect(() => {
    if (newPosts && newPosts.length > 0) {
      setReplies((prevReplies) => {
        const combined = [...newPosts, ...prevReplies];
        const uniqueReplies = Array.from(
          new Map(combined.map((post) => [post.id, post])).values()
        );
        return uniqueReplies;
      });
    }
  }, [newPosts]);

  return (
    <div className="">
      {loading ? (
        <div className="p-4 text-center">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-neutral-300" />
        </div>
      ) : replies.length > 0 ? (
        <>
          <PostList posts={replies} />
          <FeedPaginator nextDisabled={replies.length !== PAGE_SIZE} />
        </>
      ) : (
        <div className="px-6">
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
