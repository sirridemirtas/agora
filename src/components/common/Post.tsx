"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { tr } from "date-fns/locale";
import clsx from "clsx";
import {
  Trash2 as DeleteIcon,
  HeartOff as DislikeIcon,
  Heart as LikeIcon,
  MessageSquare as ReplyIcon,
  Share as ShareIcon,
} from "lucide-react";
import { useApi, useAuth, usePostAction } from "@/hooks";
import { PostService } from "@/services/PostService";
import { Post as PostType } from "@/types";
import { getUniversityById } from "@/constants/universities";
import { Avatar } from "@/components/common";

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
  replyTo,
  reactions: initialReactions,
}: PostProps) => {
  const { isLoggedIn, username: uname } = useAuth();
  const { likePost, dislikePost, unlikePost, undislikePost } = usePostAction();
  const pathname = usePathname();

  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const postService = new PostService();
  const { execute: executeDeletePost, loading: deleteLoading } = useApi(
    postService.deletePost.bind(postService)
  );

  // reactions'ı state olarak yönetiyoruz, varsayılan değerlerle başlatıyoruz
  const [reactions, setReactions] = useState({
    likeCount: initialReactions?.likeCount ?? upvotes ?? 0,
    dislikeCount: initialReactions?.dislikeCount ?? downvotes ?? 0,
    liked: initialReactions?.liked ?? false,
    disliked: initialReactions?.disliked ?? false,
  });

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

    const currentLikes = reactions.likeCount;
    const currentDislikes = reactions.dislikeCount;

    if (reactions.liked) {
      const response = await unlikePost(id);
      console.log("Unliked the post:", response);
      setReactions((prev) => ({
        ...prev,
        likeCount: currentLikes - 1,
        liked: false,
      }));
    } else {
      const response = await likePost(id);
      console.log("Liked the post:", response);
      setReactions((prev) => ({
        ...prev,
        likeCount: currentLikes + 1,
        liked: true,
        dislikeCount: reactions.disliked
          ? currentDislikes - 1
          : currentDislikes,
        disliked: reactions.disliked ? false : prev.disliked,
      }));
    }
  });

  const onDownvote = requireLogin(async () => {
    if (!id) return;

    const currentLikes = reactions.likeCount;
    const currentDislikes = reactions.dislikeCount;

    if (reactions.disliked) {
      const response = await undislikePost(id);
      console.log("Undisliked the post:", response);
      setReactions((prev) => ({
        ...prev,
        dislikeCount: currentDislikes - 1,
        disliked: false,
      }));
    } else {
      const response = await dislikePost(id);
      console.log("Disliked the post:", response);
      setReactions((prev) => ({
        ...prev,
        dislikeCount: currentDislikes + 1,
        disliked: true,
        likeCount: reactions.liked ? currentLikes - 1 : currentLikes,
        liked: reactions.liked ? false : prev.liked,
      }));
    }
  });

  const onReply = requireLogin(() => {
    console.log("Replied");
  });

  const onShare = () => {
    console.log("Shared");
  };

  const onDelete = requireLogin(async () => {
    if (!id) return;

    if (
      confirm(
        "Bu gönderiyi silmek istediğine emin misin?\n\nİçerdiği tüm cevaplar da silinecek."
      )
    ) {
      setDeleting(true);

      try {
        const response = await executeDeletePost(id);

        if (response.error) {
          console.error("Gönderi silinirken bir hata oluştu:", response.error);
          alert(
            "Gönderi silinirken bir hata oluştu: " + response.error.message
          );
        } else {
          console.log("Gönderi başarıyla silindi");
          setDeleted(true);
        }
      } catch (error) {
        console.error("Post deletion failed:", error);
        alert("Gönderi silinemedi. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setDeleting(false);
      }
    }
  });

  if (deleted) {
    return null;
  }

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
            <time className="mr-0 text-sm text-neutral-400">
              {replyTo ? (
                relativeTimeFormat(new Date(createdAt))
              ) : (
                <Link
                  className="hover:underline"
                  href={`/post/${id}`}
                  title={detailedTimeFormat(new Date(createdAt))}
                  onClick={(e) => e.stopPropagation()}
                >
                  {relativeTimeFormat(new Date(createdAt))}
                </Link>
              )}
            </time>
          )}
        </div>

        <p
          className={clsx(
            "_pl-14 mb-4 whitespace-pre-wrap" /* , detailed && "pl-0" */
          )}
        >
          {content}
        </p>

        {detailed && (
          <div className="mb-4">
            <time className="text-sm text-neutral-500">
              {detailedTimeFormat(new Date(createdAt))}
            </time>
          </div>
        )}

        <div
          className={clsx(
            "_pl-12 flex items-center justify-between gap-4",
            detailed &&
              "_pl-0 border-y border-neutral-200 py-1 dark:border-neutral-800"
          )}
        >
          {/* Upvote Button */}
          <button
            className={clsx(
              "flex items-center transition-colors",
              detailed || "-ml-2",
              reactions.liked
                ? "text-red-600 dark:text-red-400"
                : "text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
            )}
            onClick={onUpvote}
            aria-label="Beğen"
          >
            <span
              className={clsx(
                "rounded-full p-2 transition-colors",
                reactions.liked
                  ? "bg-red-50 dark:bg-red-900/20"
                  : "hover:bg-red-50 dark:hover:bg-red-900/20"
              )}
            >
              <LikeIcon
                size={18}
                fill={reactions.liked ? "currentColor" : "none"}
              />
            </span>
            <span className="min-w-[1.5rem] text-center text-sm">
              {reactions.likeCount || ""}
            </span>
          </button>

          {/* Downvote Button */}
          <button
            className={clsx(
              "flex items-center transition-colors",
              reactions.disliked
                ? "text-gray-600 dark:text-gray-400"
                : "text-neutral-500 hover:text-gray-600 dark:text-neutral-400 dark:hover:text-gray-400"
            )}
            onClick={onDownvote}
            aria-label="Beğenme"
          >
            <span
              className={clsx(
                "rounded-full p-2 transition-colors",
                reactions.disliked
                  ? "bg-gray-50 dark:bg-gray-900"
                  : "hover:bg-gray-50 dark:hover:bg-gray-900"
              )}
            >
              <DislikeIcon
                size={18}
                fill={reactions.disliked ? "currentColor" : "none"}
              />
            </span>
            <span className="min-w-[1.5rem] text-center text-sm">
              {reactions.dislikeCount || ""}
            </span>
          </button>

          {/* Reply Button */}
          {replyTo ? null : (
            <button
              className="flex items-center gap-1 text-neutral-500 transition-colors hover:text-slate-700 dark:hover:text-slate-300"
              onClick={onReply}
              aria-label="Cevapla"
            >
              <span className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ReplyIcon size={18} />
              </span>
              <span className="text-sm"></span>
            </button>
          )}

          {/* Share Button */}
          {replyTo ? null : (
            <button
              className="flex items-center text-neutral-500 transition-colors hover:text-blue-700 dark:hover:text-blue-400"
              aria-label="Paylaş"
              onClick={onShare}
            >
              <span
                className={clsx(
                  "rounded-full p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                )}
              >
                <ShareIcon size={18} />
              </span>
            </button>
          )}

          {/* Delete Button */}
          {isLoggedIn && username === uname && (
            <button
              className={clsx(
                "flex items-center text-neutral-500 transition-colors hover:text-red-700 dark:hover:text-red-400",
                deleting && "cursor-not-allowed opacity-50"
              )}
              aria-label="Sil"
              onClick={onDelete}
              disabled={deleting}
            >
              <span
                className={clsx(
                  "rounded-full p-2 hover:bg-red-50 dark:hover:bg-red-900/20",
                  detailed || "-mr-2"
                )}
              >
                {deleteLoading ? (
                  <span className="inline-block animate-spin">⋯</span>
                ) : (
                  <DeleteIcon size={18} />
                )}
              </span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
