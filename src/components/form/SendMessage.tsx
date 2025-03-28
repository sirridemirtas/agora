"use client";
import { useState } from "react";
import { useMessageService } from "@/hooks/useMessageService";
//import { Textarea } from "@headlessui/react";
import { Button, Textarea } from "@/components/ui";
import { SendIcon } from "lucide-react";

interface SendMessageProps {
  recipientUsername: string;
  onMessageSent?: (message: string) => void;
}

export default function SendMessage({
  recipientUsername,
  onMessageSent,
}: SendMessageProps) {
  const [message, setMessage] = useState("");
  const { sendMessage, sendMessageLoading } = useMessageService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      // Call the onMessageSent callback to immediately update UI
      if (onMessageSent) {
        onMessageSent(message);
      }

      // Then send the actual message through your API
      try {
        await sendMessage(recipientUsername, message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-end gap-2">
      <div className="w-full">
        <Textarea
          className="w-full resize-none overflow-hidden"
          placeholder="Mesajınızı yazın..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          rows={1}
          autosize
        />
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || sendMessageLoading}
        icon={SendIcon}
        className="mb-2"
      >
        Gönder
      </Button>
    </form>
  );
}
