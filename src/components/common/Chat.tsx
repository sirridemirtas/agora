"use client";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { useMessageService } from "@/hooks/useMessageService";
import { Avatar } from "@/components/common";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import SendMessage from "@/components/form/SendMessage";
//import Link from "next/link";

export default function Chat() {
  const pathname = usePathname();
  const conversationWith = pathname.split("/")[2];
  const { username: currentUser } = useAuth();
  const {
    conversation,
    conversationLoading,
    conversationError,
    getConversation,
    markAsRead,
  } = useMessageService();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationWith) {
      getConversation(conversationWith);
    }
  }, [getConversation, conversationWith]);

  useEffect(() => {
    if (conversation && conversationWith) {
      markAsRead(conversationWith);
    }
  }, [conversation, conversationWith, markAsRead]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  if (conversationLoading) {
    return (
      <div className={clsx("flex h-full flex-col items-center justify-center")}>
        <p>Mesajlar yükleniyor...</p>
      </div>
    );
  }

  if (conversationError) {
    return (
      <div className={clsx("flex h-full flex-col items-center justify-center")}>
        <p className={clsx("text-red-500")}>
          {conversationError.message || "Bir hata oluştu"}
        </p>
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className={clsx("flex h-full flex-col items-center justify-center")}>
        <p>Henüz bir mesaj yok. İlk mesajı gönder!</p>
        <div className={clsx("mt-4 w-full max-w-lg")}>
          <SendMessage recipientUsername={conversationWith} />
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex h-full min-h-[calc(100vh-5rem)] flex-col")}>
      {/* <div className={clsx("border-b pb-4 dark:border-neutral-800")}>
        <Link href={`/@${conversationWith}`}>
          <div className={clsx("flex items-center gap-2")}>
            <div>
              <Avatar size={12} username={conversationWith} />
            </div>
            <span className={clsx("text-lg font-semibold")}>
              <span className={clsx("opacity-50")}>@</span>
              {conversationWith}
            </span>
          </div>
        </Link>
      </div> */}

      <div className={clsx("_p-4 flex-1 overflow-y-auto")}>
        {conversation.messages.map((message, index) => {
          const isMe = message.sender === currentUser;
          const formattedTime = format(new Date(message.createdAt), "HH:mm", {
            locale: tr,
          });

          return (
            <div
              key={index}
              className={clsx(
                "mb-3 flex items-start gap-2",
                isMe ? "justify-end" : "justify-start"
              )}
            >
              {!isMe && (
                <div className={clsx("mr-1")}>
                  <Avatar size={8} username={message.sender} />
                </div>
              )}
              <div
                className={clsx(
                  "flex w-auto max-w-[320px] flex-col border border-transparent p-2.5 leading-tight",
                  isMe
                    ? "rounded-s-lg rounded-ee-lg bg-neutral-200 text-neutral-900 dark:border-neutral-800 dark:bg-transparent dark:text-white"
                    : "rounded-e-lg rounded-es-lg bg-neutral-100 dark:border-neutral-800 dark:bg-transparent"
                )}
              >
                {/* !isMe && (
                  <span
                    className={clsx(
                      "mb-1 text-sm font-semibold text-neutral-900 dark:text-white"
                    )}
                  >
                    <span className="opacity-50">@</span>
                    {message.sender}
                  </span>
                ) */}
                <p
                  className={clsx(
                    "text-sm font-normal",
                    isMe
                      ? "text-neutral-900 dark:text-white"
                      : "text-neutral-900 dark:text-white"
                  )}
                >
                  {message.content}
                </p>
                <span
                  className={clsx(
                    "font-sm mt-1 text-right text-xs",
                    isMe
                      ? "text-neutral-600 dark:text-neutral-300"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  {formattedTime}
                </span>
              </div>
              {isMe && (
                <div className={clsx("ml-1")}>
                  <Avatar size={8} username={currentUser} />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={clsx(
          "sticky bottom-16 border-t bg-white py-4 lg:bottom-0 dark:border-neutral-800 dark:bg-neutral-950"
        )}
      >
        <SendMessage recipientUsername={conversationWith} />
      </div>
    </div>
  );
}
