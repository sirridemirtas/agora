"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/common";
import Link from "next/link";
import { useNotificationService } from "@/hooks/useNotificationService";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

const NotificationItem = ({
  id,
  username,
  postId,
  postSnippet,
  type,
  likeCount,
  dislikeCount,
  read,
  createdAt,
}: {
  id: string;
  username: string;
  postId: string;
  postSnippet: string;
  type: string;
  likeCount?: number;
  dislikeCount?: number;
  read: boolean;
  createdAt: string;
}) => {
  const router = useRouter();
  const { markAsRead } = useNotificationService();

  const handleClick = async () => {
    // Mark notification as read
    await markAsRead(id);

    // Navigate to the post
    router.push(`/post/${postId}`);
  };

  return (
    <div
      className={clsx(
        "flex cursor-pointer items-start gap-2 border-b p-4 dark:border-neutral-800",
        !read && "bg-blue-50 dark:bg-blue-900/10"
      )}
      onClick={handleClick}
    >
      <Link href={`/@${username}`} onClick={(e) => e.stopPropagation()}>
        <Avatar size={12} username={username} />
      </Link>
      <div className="flex-1">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              href={`/@${username}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold hover:underline"
            >
              @{username}
            </Link>
            {type === "reaction" ? (
              <span className="text-neutral-500">gönderine tepki gösterdi</span>
            ) : (
              <span className="text-neutral-500">gönderine yanıt verdi</span>
            )}
          </div>
          <span className="text-xs text-neutral-500">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: tr,
            })}
          </span>
        </div>
        <p className="mb-2 text-sm text-neutral-700 dark:text-neutral-300">
          {postSnippet.length > 100
            ? postSnippet.slice(0, 100) + "..."
            : postSnippet}
        </p>
        {type === "reaction" && (
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <ThumbsUp size={14} />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsDown size={14} />
              <span>{dislikeCount}</span>
            </div>
          </div>
        )}
        {type === "reply" && (
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <MessageSquare size={14} />
            <span>1 yeni yanıt</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function NotificationList() {
  const { notifications, notificationsLoading, getNotifications } =
    useNotificationService();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  if (notificationsLoading) {
    return <div className="p-4 text-center">Bildirimler yükleniyor...</div>;
  }

  if (!notifications || notifications.length === 0) {
    return <div className="p-4 text-center">Hiç bildirim bulunmuyor.</div>;
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          id={notification.id}
          username={notification.username}
          postId={notification.postId}
          postSnippet={notification.postSnippet}
          type={notification.type}
          likeCount={notification.likeCount}
          dislikeCount={notification.dislikeCount}
          read={notification.read}
          createdAt={notification.createdAt}
        />
      ))}
    </div>
  );
}
