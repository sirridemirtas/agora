"use client";
import { usePathname } from "next/navigation";
import { MessageSquareOff } from "lucide-react";
import { Chat, MessageList } from "@/components/common";
import { usePageTitle } from "@/hooks";
import { useEffect } from "react";

const NoMessages = () => {
  return (
    <div className="lg:flex-1">
      <div className="p-8 py-16 text-center">
        <div className="mb-4 flex justify-center">
          <MessageSquareOff size={48} className="text-neutral-300" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">Henüz mesajınız yok</h2>
        <p className="text-neutral-500">
          Diğer kullanıcılarla yazışma başlatmak için profilini ziyaret edin
        </p>
      </div>
    </div>
  );
};

export default function MessagesPage() {
  const pathname = usePathname();
  const conversationWith = pathname.split("/")[2];
  const { setTitle } = usePageTitle();

  useEffect(() => {
    if (conversationWith) setTitle("Mesajlar / @" + conversationWith);
  }, [setTitle]);

  const messages = [{}];

  return (
    <div className="p-6">
      {conversationWith ? (
        <Chat />
      ) : messages.length ? (
        <MessageList />
      ) : (
        <NoMessages />
      )}
    </div>
  );
}
