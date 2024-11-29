"use client";
import clsx from "clsx";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button, Textarea } from "@/components/ui";

interface CreatePostProps {
  className?: string;
}

const CreatePost = ({ className }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const maxLength = 500;

  return (
    <div className={clsx("p-6", className)}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <Textarea
          placeholder="Düşüncelerini paylaş..."
          rows={3}
          maxLength={maxLength}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-end gap-4">
          <span className="text-sm text-neutral-500">
            {content.length}/{maxLength}
          </span>
          <Button icon={Send} type="submit">
            Paylaş
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
