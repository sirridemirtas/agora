"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks/useApi";
import { Post as PostType } from "@/types";

import { LoaderCircle, SearchX } from "lucide-react";
import { Post } from "@/components/common";

import { MOCK_POSTS } from "@/constants/posts";
import { Reply } from "@/components/form";

const PostNotFound = () => {
  return (
    <div className="p-8 py-16 text-center">
      <div className="mb-4 flex justify-center">
        <SearchX size={48} className="text-neutral-300" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Gönderi bulunamadı</h2>
      <p className="text-neutral-500">
        Gönderi silinmiş olabilir ya da yanlış yönlendirildiniz.
      </p>
    </div>
  );
};

const PostLoading = () => {
  return (
    <div className="p-8 py-16 text-center">
      <div className="mb-4 flex justify-center">
        <LoaderCircle size={48} className="animate-spin text-neutral-300" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Gönderi yükleniyor...</h2>
      <p className="text-neutral-500">Lütfen bekleyin.</p>
    </div>
  );
};

const PostComments = ({ poster }: { poster: string }) => {
  return (
    <>
      <div className="mx-6 mt-2 border-b border-neutral-200 dark:border-neutral-800">
        <span className="cursor-default text-sm text-neutral-500">
          <span className="text-gray-600 dark:text-neutral-400">
            {poster ? "@" + poster : "Anonim "}
          </span>{" "}
          {poster && "isimli "}kullanıcıya yanıt olarak
        </span>
        <Reply />
      </div>
      <h2 className="mx-6 mb-4 mt-6 text-lg font-semibold">Cevaplar</h2>
      <div className="">
        <Post bordered={false} {...(MOCK_POSTS[1] as PostType)} />
      </div>
    </>
  );
};

const RenderPost = ({ post }: { post: PostType }) => {
  if (!post) {
    return <PostNotFound />;
  }

  return (
    <div className="lg:flex-1">
      <Post bordered={false} detailed={true} {...(post as PostType)} />
      <PostComments poster={post.username || ""} />
    </div>
  );
};

export default function PostPage() {
  const pathname = usePathname();
  const postId = pathname.split("/")[2];

  const [post, setPost] = useState<PostType | null>(null);

  const postService = new PostService();

  const { loading, error, data, execute } = useApi(
    postService.getPost.bind(postService, postId || "")
  );

  // Use useEffect with empty dependency array to execute only once on mount
  useEffect(() => {
    if (postId) {
      execute();
    }
    // We intentionally omit execute from deps to prevent infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  useEffect(() => {
    if (data) {
      setPost(data);
    }
  }, [data]);

  if (loading)
    return (
      <div className="p-4 text-center">
        <PostLoading />
      </div>
    );
  if (error) return <PostNotFound />;

  if (process.env.NEXT_PUBLIC_IS_BACKEND_ACTIVE === "false") {
    const post = MOCK_POSTS.find((post) => post.id === postId);
    return <RenderPost post={post as PostType} />;
  }

  return <RenderPost post={post as PostType} />;
}
