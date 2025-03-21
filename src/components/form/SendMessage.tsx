"use client";
import { useState } from "react";
import { useMessageService } from "@/hooks/useMessageService";
//import { Textarea } from "@headlessui/react";
import { Button, Textarea } from "@/components/ui";
import { SendIcon } from "lucide-react";

interface SendMessageProps {
  recipientUsername?: string;
}

export default function SendMessage({ recipientUsername }: SendMessageProps) {
  const [message, setMessage] = useState("");
  const { sendMessage, sendMessageLoading } = useMessageService();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !recipientUsername) return;

    try {
      await sendMessage(recipientUsername, message);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-col items-end gap-2"
    >
      <div className="w-full">
        <Textarea
          className="w-full resize-none"
          placeholder="Mesajınızı yazın..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={2}
          autosize
        />
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || sendMessageLoading}
        icon={SendIcon}
      >
        Gönder
      </Button>
    </form>
  );
}
