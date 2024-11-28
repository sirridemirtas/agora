"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import cn from "classnames";
import {
  Bookmark,
  Ellipsis,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Post as PostType } from "@/types";

const Post = ({
  id,
  content,
  timestamp,
  university,
  universityId,
  username,
  upvotes,
  downvotes,
  commentsCount,
  isPrivate,
}: PostType) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  function requireLogin(func: (...args: unknown[]) => void) {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation(); // Stop event bubbling

      if (!isLoggedIn) {
        console.warn("Bu işlemi yapmak için izniniz yok. Giriş yapılmamış!");
        return;
      }
      return func(e);
    };
  }

  const onUpvote = requireLogin(() => {
    console.log("Upvoted");
  });

  const onDownvote = requireLogin(() => {
    console.log("Downvoted");
  });

  const onComment = requireLogin(() => {
    console.log("Commented");
  });

  const onDetail = () => {
    if (!id) return;
    router.push(`/post/${id}`);
  };

  return (
    <article
      className={cn(
        "sm:px-6 text-sm sm:text-base",
        "transition-colors duration-200 ease-in-out",
        //"border-b border-neutral-200",
        "cursor-pointer _hover:bg-neutral-50 rounded-xl"
      )}
      onClick={onDetail}
    >
      <div className="px-6 sm:px-0 pt-4 pb-2 border-t border-neutral-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            {!isPrivate && username ? (
              <span className="font-medium">{username}</span>
            ) : (
              <span className="text-neutral-500">Anonim</span>
            )}
            <span className="text-neutral-400 mx-2">·</span>
            <span className="text-neutral-500 hover:underline">
              <Link
                href={`/university/${universityId}`}
                onClick={(e) => e.stopPropagation()}
              >
                {university}
              </Link>
            </span>
          </div>
          <time className="text-sm text-neutral-400 hover:underline">
            <Link href={`/post/${id}`}>
              {formatDistanceToNow(new Date(timestamp), {
                locale: tr,
                addSuffix: true,
              })}
            </Link>
          </time>
        </div>

        <p className="text-neutral-800 mb-4">{content}</p>

        <div className="flex justify-between">
          <button
            className="flex items-center text-neutral-500"
            onClick={onUpvote}
          >
            <span className="p-2 rounded-3xl hover:bg-green-50 hover:text-green-700">
              <ThumbsUp size={18} />
            </span>
            <span className="text-sm">{upvotes}</span>
          </button>
          <button
            className="flex items-center text-neutral-500"
            onClick={onDownvote}
          >
            <span className="p-2 rounded-3xl hover:bg-red-100 hover:text-red-700">
              <ThumbsDown size={18} />
            </span>
            <span className="text-sm">{downvotes}</span>
          </button>
          <button
            className="flex items-center text-neutral-500"
            onClick={onComment}
          >
            <span className="p-2 rounded-3xl hover:bg-slate-300 hover:text-slate-700">
              <MessageSquare size={18} />
            </span>
            <span className="text-sm">{commentsCount}</span>
          </button>
          <span className="flex flex-row">
            <button className="flex items-center text-neutral-500">
              <span className="p-2 rounded-3xl hover:bg-blue-100 hover:text-blue-700">
                <Bookmark size={18} />
              </span>
            </button>
            <button className="flex items-center text-neutral-500">
              <span className="p-2 rounded-3xl hover:bg-blue-100 hover:text-blue-700">
                <Ellipsis size={18} />
              </span>
            </button>
          </span>
        </div>
      </div>
    </article>
  );
};

export default Post;
