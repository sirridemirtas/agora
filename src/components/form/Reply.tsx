"use client";
import clsx from "clsx";
import { useState } from "react";
import { Button, Textarea } from "@/components/ui";

interface ReplyProps {
  className?: string;
}

const Reply = ({ className }: ReplyProps) => {
  const [content, setContent] = useState("");
  const maxLength = 500;

  return (
    <div className={clsx("py-4", className)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Textarea
          placeholder="Cevabını yaz"
          rows={3}
          maxLength={maxLength}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex items-center justify-end gap-4">
          <span className="text-sm text-neutral-500">
            {content.length}/{maxLength}
          </span>
          <Button type="submit">Cevapla</Button>
        </div>
      </form>
    </div>
  );
};

export default Reply;
