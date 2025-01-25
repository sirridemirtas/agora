"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import clsx from "clsx";
import {
  Bookmark,
  Ellipsis,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Post as PostType } from "@/types";

interface PostProps extends PostType {
  bordered?: boolean;
  detailed?: boolean;
}

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
  detailed = false,
}: PostProps) => {
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
    router.push(`/post?id=${id}`);
  };

  return (
    <article
      className={clsx(
        "rounded-xl text-sm sm:px-6 sm:text-base",
        "transition-colors duration-200 ease-in-out",
        detailed || "cursor-pointer"
      )}
      onClick={!detailed ? onDetail : () => {}}
    >
      <div
        className={clsx(
          detailed || "border-t border-neutral-200 dark:border-neutral-800",
          "px-6 pb-2 pt-4 sm:px-0"
        )}
      >
        <div className="mb-2 flex items-center justify-between">
          <div>
            {!isPrivate && username ? (
              <span className="font-medium">@{username}</span>
            ) : (
              <span className="text-neutral-500">Anonim</span>
            )}
            <span className="mx-2 text-neutral-400">·</span>
            <span className="text-neutral-500 hover:underline">
              <Link
                href={`/university/${universityId}`}
                onClick={(e) => e.stopPropagation()}
              >
                {university}
              </Link>
            </span>
          </div>
          {detailed || (
            <time className="text-sm text-neutral-400 hover:underline">
              <Link href={`/post?id=${id}`}>
                {formatDistanceToNow(new Date(timestamp), {
                  locale: tr,
                  addSuffix: true,
                })}
              </Link>
            </time>
          )}
        </div>

        <p className="mb-4">{content}</p>

        <div
          className={clsx(
            "flex justify-between",
            detailed &&
              "border-y border-neutral-200 py-1 dark:border-neutral-800"
          )}
        >
          <button
            className="flex items-center text-neutral-500"
            onClick={onUpvote}
          >
            <span className="rounded-3xl p-2 hover:bg-green-50 hover:text-green-700">
              <ThumbsUp size={18} />
            </span>
            <span className="text-sm">{upvotes}</span>
          </button>
          <button
            className="flex items-center text-neutral-500"
            onClick={onDownvote}
          >
            <span className="rounded-3xl p-2 hover:bg-red-100 hover:text-red-700">
              <ThumbsDown size={18} />
            </span>
            <span className="text-sm">{downvotes}</span>
          </button>
          <button
            className="flex items-center text-neutral-500"
            onClick={onComment}
          >
            <span className="rounded-3xl p-2 hover:bg-slate-300 hover:text-slate-700">
              <MessageSquare size={18} />
            </span>
            <span className="text-sm">{commentsCount}</span>
          </button>
          <span className="flex flex-row">
            <button className="flex items-center text-neutral-500">
              <span className="rounded-3xl p-2 hover:bg-blue-100 hover:text-blue-700">
                <Bookmark size={18} />
              </span>
            </button>
            <button className="flex items-center text-neutral-500">
              <span className="rounded-3xl p-2 hover:bg-blue-100 hover:text-blue-700">
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
