"use client";
import { SearchX } from "lucide-react";
import { Post } from "@/components/common";
import { Post as PostType } from "@/types";
import { useSearchParams } from "next/navigation";

import { MOCK_POSTS } from "@/constants/posts";

export default function PostPage() {
  const params = useSearchParams();
  const postId = params.get("id") || undefined;

  return (
    <div className="lg:flex-1">
      {postId ? (
        <Post
          bordered={false}
          {...(MOCK_POSTS.find((post) => post.id === postId) as PostType)}
        />
      ) : (
        <div className="p-8 py-16 text-center">
          <div className="mb-4 flex justify-center">
            <SearchX size={48} className="text-neutral-300" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Gönderi bulunamadı</h2>
          <p className="text-neutral-500">
            Gönderi silinmiş olabilir ya da yanlış yönlendirildiniz.
          </p>
        </div>
      )}
    </div>
  );
}
