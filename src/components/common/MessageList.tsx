"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import {
  format,
  isToday,
  isYesterday,
  isWithinInterval,
  subDays,
} from "date-fns";
import { tr } from "date-fns/locale";
import { Avatar } from "@/components/common";
import { useMessageService } from "@/hooks/useMessageService";
import { useAuth } from "@/hooks";
import { Loader } from "@/components/ui";

const CustomLink = ({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <Link href={href} {...props} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

const ListItem = ({
  username,
  message,
  time,
  unreadCount,
}: {
  username: string;
  message: string;
  time: string;
  unreadCount: number;
}) => {
  const router = useRouter();

  return (
    <div
      className="flex cursor-pointer items-start gap-2 dark:border-neutral-800"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/messages/${username}`);
      }}
    >
      <CustomLink href={`/@${username}`}>
        <div className="mt-3">
          <Avatar size={12} username={username} />
        </div>
      </CustomLink>
      <div className="flex w-full flex-col border-b py-3 dark:border-neutral-800">
        <div className="flex w-full flex-row items-center justify-between">
          <CustomLink
            href={`/@${username}`}
            className="flex items-center gap-1"
          >
            <span className={clsx("font-semibold")}>
              <span className="opacity-50">@</span>
              <span className="hover:underline">{username}</span>
            </span>{" "}
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center rounded-full border border-white bg-red-500 px-[3px] text-[0.6em] font-light text-white dark:border-neutral-300">
                {unreadCount}
              </span>
            )}
          </CustomLink>
          <span
            className={clsx(
              "text-gray -500 text-sm text-neutral-500",
              unreadCount && "font-semibold"
            )}
          >
            {time}
          </span>
        </div>
        <p
          className={clsx(
            "text-wrap break-words text-sm text-neutral-500",
            unreadCount && "font-semibold"
          )}
        >
          {message
            ? message.length > 30
              ? message.slice(0, 30) + "..."
              : message
            : "-"}
        </p>
      </div>
    </div>
  );
};

export default function MessageList() {
  const { conversations, conversationsLoading, getConversations } =
    useMessageService();
  const { username: currentUser } = useAuth();

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  if (conversationsLoading) {
    return (
      <div className="showAfter p-4 text-center">
        <Loader size={24} />
        Mesajlar yükleniyor...
      </div>
    );
  }

  if (!conversations || conversations.length === 0) {
    return <div className="p-4 text-center">Henüz mesajınız bulunmuyor.</div>;
  }

  return (
    <div className="flex flex-col">
      {conversations.map((conversation) => {
        const otherUser =
          conversation.participants.find(
            (participant) => participant !== currentUser
          ) || "";
        const lastMessage = conversation.messages[0];
        const unreadCount = conversation.unreadCounts[currentUser || ""] || 0;

        return (
          <ListItem
            key={conversation.id}
            username={otherUser}
            message={lastMessage.content}
            time={formatDate(new Date(lastMessage.createdAt))}
            unreadCount={unreadCount}
          />
        );
      })}
    </div>
  );
}

function formatDate(date: Date): string {
  const now = new Date();

  // Bugün ise sadece saat:dakika döndür
  if (isToday(date)) {
    return format(date, "HH:mm", { locale: tr });
  }

  // Dün ile son 7 gün arasındaysa haftanın gününü döndür
  if (
    isWithinInterval(date, {
      start: subDays(now, 6),
      end: now,
    }) &&
    !isYesterday(date)
  ) {
    return format(date, "EEEE", { locale: tr }); // Ör: "Çarşamba"
  }

  // Daha eski tarihler için GG.AA.YYYY formatı
  return format(date, "dd.MM.yyyy", { locale: tr });
}
