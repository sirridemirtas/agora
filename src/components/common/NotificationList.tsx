"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  isSameYear,
} from "date-fns";
import { tr } from "date-fns/locale";
import {
  MessageSquare as ReplyIcon,
  Heart as LikeIcon,
  HeartOff as DislikeIcon,
} from "lucide-react";
import { useNotificationService } from "@/hooks/useNotificationService";
import { Loader } from "@/components/ui";

function formatNotificationDate(date: Date): string {
  const now = new Date();

  const secondsDiff = differenceInSeconds(now, date);
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);

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

const NotificationItem = ({
  id,
  postId,
  postSnippet,
  type,
  likeCount,
  dislikeCount,
  read,
  createdAt,
}: {
  id: string;
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
        "flex cursor-pointer items-start gap-2 border-b p-3 dark:border-neutral-800"
        //!read && "bg-gray-100 dark:bg-gray-900/50"
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          "flex-1",
          read ||
            "before:content-[' '] before:absolute before:-ml-3 before:mt-2 before:h-2 before:w-2 before:rounded-full before:bg-red-500 before:dark:bg-red-300"
        )}
      >
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {type === "reaction" ? (
              <span className="text-neutral-500">
                Gönderinize tepki verildi
              </span>
            ) : (
              <span className="text-neutral-500">
                Gönderinize yanıt verildi
              </span>
            )}
          </div>
          <span className="text-sm text-neutral-500">
            {formatNotificationDate(new Date(createdAt))}
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
              <LikeIcon size={14} />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <DislikeIcon size={14} />
              <span>{dislikeCount}</span>
            </div>
          </div>
        )}
        {type === "reply" && (
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <ReplyIcon size={14} />
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
    return (
      <div className="showAfter p-4 text-center">
        <Loader size={24} />
        Bildirimler yükleniyor...
      </div>
    );
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
          postId={notification.postId}
          postSnippet={notification.postSnippet}
          type={notification.type}
          likeCount={notification.likeCount}
          dislikeCount={notification.dislikeCount}
          read={notification.read}
          createdAt={notification.updatedAt || notification.createdAt}
        />
      ))}
    </div>
  );
}
