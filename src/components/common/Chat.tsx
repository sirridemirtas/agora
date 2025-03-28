"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";
import { useMessageService } from "@/hooks/useMessageService";
import { Avatar } from "@/components/common";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import SendMessage from "@/components/form/SendMessage";
import { Alert, Loader } from "@/components/ui";
//import Link from "next/link";

export default function Chat() {
  const pathname = usePathname();
  const conversationWith = pathname.split("/")[2];
  const { username } = useAuth();
  const currentUser = username || "anonymous";
  const {
    conversation,
    conversationLoading,
    conversationError,
    getConversation,
    markAsRead,
  } = useMessageService();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [localConversation, setLocalConversation] = useState(conversation);

  useEffect(() => {
    setLocalConversation(conversation);
  }, [conversation]);

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
      messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [localConversation]);

  const addLocalMessage = (content: string) => {
    if (!localConversation) {
      // If this is the first message, create a new conversation
      setLocalConversation({
        id: `${currentUser}-${conversationWith}`,
        participants: [currentUser, conversationWith],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        unreadCounts: { [conversationWith]: 0, [currentUser]: 0 },
        messages: [
          {
            content,
            sender: currentUser,
            //receiver: conversationWith,
            createdAt: new Date().toISOString(),
            //read: false,
          },
        ],
      });
    } else {
      // Add the message to the existing conversation
      setLocalConversation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              content,
              sender: currentUser,
              receiver: conversationWith,
              createdAt: new Date().toISOString(),
              read: false,
            },
          ],
        };
      });
    }

    // Ensure scroll happens after the state update
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  if (conversationLoading) {
    return <Loader size={24} />;
  }

  if (conversationError) {
    return (
      <Alert
        type="error"
        title="Bir hata oluştu"
        message={conversationError.message || "Bir hata oluştu"}
      />
    );
  }

  if (!localConversation) {
    return (
      <div className={clsx("flex h-full flex-col items-center justify-center")}>
        <p>Henüz bir mesaj yok. İlk mesajı gönder!</p>
        <div className={clsx("mt-4 w-full max-w-lg")}>
          <SendMessage
            recipientUsername={conversationWith}
            onMessageSent={addLocalMessage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("flex h-full min-h-[calc(100vh-6rem)] flex-col")}>
      <div className={clsx("_p-4 flex-1 overflow-y-auto")}>
        {localConversation.messages.map((message, index) => {
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
                  <Link href={`/@${message.sender}`}>
                    <Avatar size={8} username={message.sender} />
                  </Link>
                </div>
              )}
              <div
                className={clsx(
                  "flex w-auto max-w-[250px] flex-col border border-transparent p-2.5 leading-tight lg:max-w-[320px]",
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
                    "text-wrap break-words text-sm font-normal",
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
        <SendMessage
          recipientUsername={conversationWith}
          onMessageSent={addLocalMessage}
        />
      </div>
    </div>
  );
}
