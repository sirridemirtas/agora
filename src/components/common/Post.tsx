"use client";
import Link from "next/link";
import { usePathname /* , useRouter */ } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { tr } from "date-fns/locale";
import clsx from "clsx";
import {
  Bookmark,
  Ellipsis,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "@/hooks";
import { usePostAction } from "@/hooks/usePostAction";
import { Post as PostType } from "@/types";
import { getUniversityById } from "@/constants/universities";
import Avatar from "./Avatar";

interface PostProps extends PostType {
  bordered?: boolean;
  detailed?: boolean;
}

export const detailedTimeFormat = (date: Date) =>
  format(date, "h:mm a · d MMM yyyy", { locale: tr });

export const relativeTimeFormat = (date: Date) =>
  formatDistanceToNow(date, { locale: tr, addSuffix: true });

const Post = ({
  id,
  bordered = false,
  content,
  createdAt,
  university,
  universityId,
  username,
  upvotes,
  downvotes,
  isPrivate,
  detailed = false,
  reactions,
}: PostProps) => {
  const { isLoggedIn } = useAuth();
  const { likePost, dislikePost, unlikePost, undislikePost } = usePostAction();
  const pathname = usePathname();

  function requireLogin(func: (...args: unknown[]) => void) {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (!isLoggedIn) {
        console.warn("Bu işlemi yapmak için izniniz yok. Giriş yapılmamış!");
        return;
      }
      return func(e);
    };
  }

  const onUpvote = requireLogin(async () => {
    if (!id) return;

    const currentLikes = reactions?.likeCount ?? upvotes ?? 0;
    const currentDislikes = reactions?.dislikeCount ?? downvotes ?? 0;

    if (reactions?.liked) {
      const response = await unlikePost(id);
      console.log("Unliked the post:", response);
      reactions.likeCount = currentLikes - 1;
      reactions.liked = false;
    } else {
      const response = await likePost(id);
      console.log("Liked the post:", response);
      reactions.likeCount = currentLikes + 1;
      reactions.liked = true;
      if (reactions?.disliked) {
        reactions.dislikeCount = currentDislikes - 1;
        reactions.disliked = false;
      }
    }
  });

  const onDownvote = requireLogin(async () => {
    if (!id) return;

    const currentLikes = reactions?.likeCount ?? upvotes ?? 0;
    const currentDislikes = reactions?.dislikeCount ?? downvotes ?? 0;

    if (reactions?.disliked) {
      const response = await undislikePost(id);
      console.log("Undisliked the post:", response);
      reactions.dislikeCount = currentDislikes - 1;
      reactions.disliked = false;
    } else {
      const response = await dislikePost(id);
      console.log("Disliked the post:", response);
      reactions.dislikeCount = currentDislikes + 1;
      reactions.disliked = true;
      if (reactions?.liked) {
        reactions.likeCount = currentLikes - 1;
        reactions.liked = false;
      }
    }
  });

  const onComment = requireLogin(() => {
    console.log("Commented");
  });

  return (
    <article
      className={clsx(
        "rounded-xl text-sm sm:px-6 sm:text-base",
        "transition-colors duration-200 ease-in-out"
      )}
    >
      <div
        className={clsx(
          detailed || "border-t border-neutral-200 dark:border-neutral-800",
          bordered && "border-b",
          "px-6 pb-2 pt-4 sm:px-0"
        )}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-row items-center">
            <Link
              className="h-12 w-12"
              href={"/@" + username}
              onClick={(e) => e.stopPropagation()}
            >
              <Avatar username={username} size={12} />
            </Link>
            <div className="ml-2 flex flex-col">
              {!isPrivate && username ? (
                <Link
                  href={"/@" + username}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-neutral-500">@</span>
                  <span className="hover:underline">{username}</span>
                </Link>
              ) : (
                <span className="text-neutral-500">Anonim</span>
              )}
              {pathname.startsWith("/university") || (
                <>
                  <span className="text-neutral-500 hover:underline">
                    <Link
                      href={`/university/${universityId}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {university ||
                        (universityId && getUniversityById(universityId)?.name)}
                    </Link>
                  </span>
                </>
              )}
            </div>
          </div>
          {detailed || (
            <time className="mr-0 text-sm text-neutral-400 hover:underline">
              <Link
                href={`/post/${id}`}
                title={detailedTimeFormat(new Date(createdAt))}
                onClick={(e) => e.stopPropagation()}
              >
                {relativeTimeFormat(new Date(createdAt))}
              </Link>
            </time>
          )}
        </div>

        <p className="mb-4 whitespace-pre-wrap">{content}</p>

        {detailed && (
          <div className="mb-4">
            <time className="text-sm text-neutral-500">
              {detailedTimeFormat(new Date(createdAt))}
            </time>
          </div>
        )}

        <div
          className={clsx(
            "flex justify-between",
            detailed &&
              "border-y border-neutral-200 py-1 dark:border-neutral-800"
          )}
        >
          <button
            className={clsx(
              "flex items-center",
              reactions?.liked
                ? "text-green-600 dark:text-green-400"
                : "text-neutral-500 dark:text-neutral-400"
            )}
            onClick={onUpvote}
          >
            <span
              className={clsx(
                "rounded-3xl p-2",
                /* reactions?.liked
                  ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" :  */
                "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400"
              )}
            >
              <ThumbsUp
                size={18}
                fill={reactions?.liked ? "currentColor" : "none"}
              />
            </span>
            <span className="text-sm">{reactions?.likeCount || upvotes}</span>
          </button>
          <button
            className={clsx(
              "flex items-center",
              reactions?.disliked
                ? "text-red-600 dark:text-red-400"
                : "text-neutral-500 dark:text-neutral-400"
            )}
            onClick={onDownvote}
          >
            <span
              className={clsx(
                "rounded-3xl p-2",
                /* reactions?.disliked
                  ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400" : */
                "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              )}
            >
              <ThumbsDown
                size={18}
                fill={reactions?.disliked ? "currentColor" : "none"}
              />
            </span>
            <span className="text-sm">
              {reactions?.dislikeCount || downvotes}
            </span>
          </button>
          <button
            className="flex items-center text-neutral-500"
            onClick={onComment}
          >
            <span className="rounded-3xl p-2 hover:bg-slate-300 hover:text-slate-700">
              <MessageSquare size={18} />
            </span>
            <span className="text-sm"></span>
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
