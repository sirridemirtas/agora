"use client";
import { PostService } from "@/services/PostService";
import BaseFeed from "./BaseFeed";
import { Post } from "@/types";

interface RepliesProps {
  postId: string;
}

export const Replies = ({ postId }: RepliesProps) => {
  const postService = new PostService();

  // Filter function to only show new posts that are replies to this post
  const filterNewPosts = (posts: Post[]) => {
    // Only use replyTo as that's the property defined in the Post type
    return posts.filter((post) => post.replyTo === postId);
  };

  return (
    <div className="">
      <BaseFeed
        fetchFunction={(page) => postService.getPostReplies(postId, page)}
        emptyTitle="Bu gönderiye henüz cevap yazılmamış"
        emptyMessage="Tüm cevaplar burada görünecek."
        filterNewPosts={filterNewPosts}
      />
    </div>
  );
};

export default Replies;
