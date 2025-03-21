"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/common";
import Link from "next/link";
import { useMessageService } from "@/hooks/useMessageService";
import { useAuth } from "@/hooks";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

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
            <span className="font-semibold">
              <span className="opacity-50">@</span>
              <span className="hover:underline">{username}</span>
            </span>{" "}
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center rounded-full border border-white bg-red-500 px-[3px] text-[0.6em] font-light text-white dark:border-neutral-300">
                {unreadCount}
              </span>
            )}
          </CustomLink>
          <span className="text-gray -500 text-sm text-neutral-500">
            {time}
          </span>
        </div>
        <p
          className={clsx(
            "text-sm text-neutral-500",
            unreadCount && "font-semibold"
          )}
        >
          {message
            ? message.length > 60
              ? message.slice(0, 60) + "..."
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
    return <div className="p-4 text-center">Mesajlar yükleniyor...</div>;
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
            time={formatDistanceToNow(new Date(lastMessage.createdAt), {
              addSuffix: true,
              locale: tr,
            })}
            unreadCount={unreadCount}
          />
        );
      })}
    </div>
  );
}
