"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  isSameYear,
} from "date-fns";
import { tr } from "date-fns/locale";
import clsx from "clsx";
import {
  Trash2 as DeleteIcon,
  HeartOff as DislikeIcon,
  Ellipsis,
  Heart as LikeIcon,
  //MessageSquare as ReplyIcon,
  Share as ShareIcon,
} from "lucide-react";
import { useApi, useAuth, useLoginModal, usePostAction } from "@/hooks";
import { PostService } from "@/services/PostService";
import { Post as PostType } from "@/types";
import {
  getUniversityById,
  universities,
  indeEki,
} from "@/constants/universities";
import { Avatar } from "@/components/common";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui";
interface PostProps extends PostType {
  bordered?: boolean;
  detailed?: boolean;
}

export const detailedTimeFormat = (date: Date) =>
  format(date, "h:mm a · d MMM yyyy", { locale: tr });

function relativeTimeFormat(
  date: Date,
  isProfileView: boolean = false
): string {
  const now = new Date();

  if (isProfileView) {
    return format(date, "HH:mm '·' dd MMM yyyy", { locale: tr });
  }

  // Ana sayfa (timeline) formatı
  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  //const daysDiff = differenceInDays(now, date);

  if (secondsDiff < 60) {
    return `${secondsDiff}sn`; // Saniye
  } else if (minutesDiff < 60) {
    return `${minutesDiff}dk`; // Dakika
  } else if (hoursDiff < 24) {
    return `${hoursDiff}sa`; // Saat
  } else if (isSameYear(now, date)) {
    return format(date, "dd MMM", { locale: tr }); // Gün ve ay
  } else {
    return format(date, "dd MMM yyyy", { locale: tr }); // Gün, ay, yıl
  }
}

export default function Post({
  id,
  bordered = false,
  content,
  createdAt,
  university,
  universityId,
  username,
  userUniversityId,
  upvotes,
  downvotes,
  isPrivate,
  detailed = false,
  replyTo,
  reactions: initialReactions,
}: PostProps) {
  const { isLoggedIn, username: uname, role } = useAuth();
  const { likePost, dislikePost, unlikePost, undislikePost } = usePostAction();
  const pathname = usePathname();
  const isUniversityPage = pathname.startsWith("/university");
  const router = useRouter();

  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const [avatarLaugh, setAvatarLaugh] = useState(false);

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

  const { openModal } = useLoginModal();
  function requireLogin(func: (...args: unknown[]) => void) {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (!isLoggedIn) {
        openModal();
        //console.warn("Bu işlemi yapmak için izniniz yok. Giriş yapılmamış!");
        return;
      }
      return func(e);
    };
  }

  const onUpvote = requireLogin(async () => {
    if (!id) return;

    const currentLikes = reactions.likeCount;
    const currentDislikes = reactions.dislikeCount;

    if (!reactions.liked) {
      setAvatarLaugh(true);
      setTimeout(() => {
        setAvatarLaugh(false);
      }, 1000);
    }

    if (reactions.liked) {
      await unlikePost(id);
      setReactions((prev) => ({
        ...prev,
        likeCount: currentLikes - 1,
        liked: false,
      }));
    } else {
      await likePost(id);
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
      await undislikePost(id);
      setReactions((prev) => ({
        ...prev,
        dislikeCount: currentDislikes - 1,
        disliked: false,
      }));
    } else {
      await dislikePost(id);
      setReactions((prev) => ({
        ...prev,
        dislikeCount: currentDislikes + 1,
        disliked: true,
        likeCount: reactions.liked ? currentLikes - 1 : currentLikes,
        liked: reactions.liked ? false : prev.liked,
      }));
    }
  });

  /* const onReply = requireLogin(() => {
    console.log("Replied");
  });

  const onShare = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  }; */

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
          alert(
            "Gönderi silinirken bir hata oluştu: " + response.error.message
          );
        } else {
          setDeleted(true);

          if (detailed) {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/");
            }
          }
        }
      } catch (error) {
        alert("Gönderi silinemedi. Lütfen daha sonra tekrar deneyin." + error);
      } finally {
        setDeleting(false);
      }
    }
  });

  // Check if content has more than 5 lines
  const contentLines = content.split("\n");
  const isLongContent = contentLines.length > 5;

  // Get abbreviated content (first 5 lines)
  const getAbbreviatedContent = () => {
    if (!isLongContent || detailed || showFullContent) {
      return content;
    }
    return contentLines.slice(0, 5).join("\n");
  };

  if (deleted) {
    return null;
  }

  return (
    <article
      className={clsx(
        "_text-sm rounded-xl sm:px-6 sm:text-base",
        "transition-colors duration-200 ease-in-out",
        replyTo || detailed ? "" : "cursor-pointer"
      )}
      onClick={
        replyTo || detailed
          ? () => {}
          : (e) => {
              e.stopPropagation();
              router.push(`/post/${id}`);
            }
      }
    >
      <div
        className={clsx(
          "px-4 pb-2 pt-4 sm:px-0",
          detailed || "border-t border-neutral-200 dark:border-neutral-800",
          bordered && "border-b"
        )}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex w-full flex-row items-start">
            {username ? (
              <Link
                className="h-12 w-12"
                href={"/@" + username}
                onClick={(e) => e.stopPropagation()}
              >
                <Avatar username={username} size={12} laugh={avatarLaugh} />
              </Link>
            ) : (
              <Avatar size={12} />
            )}
            <div className="ml-2 flex w-full flex-col items-start">
              <div className="flex w-full flex-row items-center justify-between gap-1">
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
              <div className="text-neutral-500 hover:underline">
                <Link
                  href={`/university/${userUniversityId}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {university ||
                    (userUniversityId &&
                      getUniversityById(userUniversityId)?.name)}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <p className={clsx("whitespace-pre-wrap")}>
            {getAbbreviatedContent()}
          </p>
          {isLongContent && !detailed && !showFullContent && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFullContent(true);
              }}
              className="text-blue-600 hover:underline dark:text-blue-300"
            >
              Devamını görüntüle
            </button>
          )}
        </div>
        {!isUniversityPage &&
          userUniversityId &&
          universityId &&
          userUniversityId !== universityId && (
            <div className="mb-4">
              <span className="text-sm text-neutral-500">
                <Link
                  className="hover:underline"
                  href={`/university/${universityId}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const uni = universities.find((u) => u.id === universityId);
                    return uni
                      ? `${uni.name}'${indeEki(uni.name)}`
                      : "Bilinmeyen Üniversite";
                  })()}
                </Link>{" "}
                paylaşıldı
              </span>
            </div>
          )}

        {detailed && (
          <div className="mb-4">
            <time className="text-sm text-neutral-500">
              {detailedTimeFormat(new Date(createdAt))}
            </time>
          </div>
        )}

        <div
          className={clsx(
            "flex items-center justify-between gap-4",
            detailed &&
              "border-y border-neutral-200 py-2 dark:border-neutral-800"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-0 rounded-full bg-neutral-100 dark:bg-neutral-800">
              {/* Upvote Button */}
              <button
                className={clsx(
                  "flex items-center transition-colors",
                  reactions.liked
                    ? "text-red-600 dark:text-red-400"
                    : "text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
                )}
                onClick={onUpvote}
                aria-label="Beğen"
              >
                <span
                  className={clsx(
                    "flex-shrink-0 rounded-full p-2 transition-colors"
                  )}
                >
                  <LikeIcon
                    size={18}
                    fill={reactions.liked ? "currentColor" : "none"}
                  />
                </span>
              </button>

              {/* Seperator */}
              <div
                className={clsx(
                  "h-5 w-[1px] bg-neutral-400 dark:bg-neutral-500",
                  detailed && "hidden sm:block"
                )}
              ></div>

              {/* Downvote Button */}
              <button
                className={clsx(
                  "flex flex-shrink-0 items-center transition-colors",
                  reactions.disliked
                    ? "text-gray-600 dark:text-gray-400"
                    : "text-neutral-500 hover:text-gray-600 dark:text-neutral-400 dark:hover:text-gray-400"
                )}
                onClick={onDownvote}
                aria-label="Beğenme"
              >
                <span className={"rounded-full p-2 transition-colors"}>
                  <DislikeIcon
                    size={18}
                    fill={reactions.disliked ? "currentColor" : "none"}
                  />
                </span>
              </button>
            </div>
            <span
              className={"left-0 text-xs text-neutral-500"}
              title={
                reactions.likeCount +
                " Beğenme, " +
                reactions.dislikeCount +
                " Beğenmeme"
              }
            >
              {reactions.likeCount > 0 && reactions.likeCount + " Beğenme"}
              {reactions.likeCount > 0 && reactions.dislikeCount > 0 && ", "}
              {reactions.dislikeCount > 0 &&
                reactions.dislikeCount + " Beğenmeme"}
            </span>
          </div>

          {/* Comment Button */}

          {/* Reply Button
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
          )} */}

          <div className="flex flex-row items-center gap-0 rounded-full bg-neutral-100 dark:bg-neutral-800">
            {/* Share Button */}
            {replyTo ? null : (
              <DropdownMenu
                button={
                  <button
                    className="focus-within::text-blue-700 flex items-center text-neutral-500 transition-colors"
                    aria-label="Paylaş"
                  >
                    <span className={"rounded-full p-2"}>
                      <ShareIcon size={18} />
                    </span>
                  </button>
                }
              >
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/post/${id}`
                    );
                    //alert("Bağlantı kopyalandı");
                  }}
                >
                  Bağlantıyı Kopyala
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    try {
                      navigator
                        .share({
                          title: content.slice(0, 37) + "...",
                          //text: content,
                          url: `${window.location.origin}/post/${id}`,
                        })
                        .catch((error) => {
                          // AbortError occurs when user cancels sharing, which is expected behavior
                          if (error.name !== "AbortError") {
                            console.log("Sharing failed", error);
                          }
                        });
                    } catch (error) {
                      console.log("Sharing failed", error);
                    }
                  }}
                >
                  Paylaş
                </DropdownMenuItem>
              </DropdownMenu>
            )}

            {/* Delete Button */}
            {isLoggedIn && (username === uname || role === 1 || role === 2) && (
              <button
                className={clsx(
                  "flex items-center text-neutral-500 transition-colors hover:text-red-700 dark:hover:text-red-400",
                  deleting && "cursor-not-allowed opacity-50"
                )}
                aria-label="Sil"
                onClick={onDelete}
                disabled={deleting}
              >
                <span className={"rounded-full p-2"}>
                  {deleteLoading ? (
                    <Ellipsis size={18} />
                  ) : (
                    <DeleteIcon size={18} />
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
