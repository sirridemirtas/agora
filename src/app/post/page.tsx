"use client";
import { SearchX } from "lucide-react";
import { Post } from "@/components/common";
import { Post as PostType } from "@/types";
import { useSearchParams } from "next/navigation";

import { MOCK_POSTS } from "@/constants/posts";
import { Reply } from "@/components/form";

export default function PostPage() {
  const params = useSearchParams();
  const postId = params.get("id") || undefined;

  const post = MOCK_POSTS.find((post) => post.id === postId);

  return (
    <div className="lg:flex-1">
      {post ? (
        <Post bordered={false} detailed={true} {...(post as PostType)} />
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

      {post && (
        <div className="mx-6 mt-2 border-b border-neutral-200 dark:border-neutral-800">
          <span className="cursor-default text-sm text-neutral-500">
            <span className="text-gray-600 dark:text-neutral-400">
              @{post.username}
            </span>{" "}
            isimli kullanıcıya yanıt olarak
          </span>
          <Reply />
        </div>
      )}
    </div>
  );
}
