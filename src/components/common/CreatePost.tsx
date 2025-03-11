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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setContent(content.trim());

    console.log(content);
  };

  const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.scrollTop = 0;
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 2 + "px";
  };

  return (
    <div className={clsx("p-6", className)}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Textarea
          name="content"
          onInput={resize}
          placeholder="Düşüncelerini paylaş..."
          rows={3}
          maxLength={maxLength}
          minLength={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div
          className={clsx(
            "flex items-center justify-end gap-4 bg-white dark:bg-neutral-950",
            content && "sticky sm:bottom-16 lg:bottom-0"
          )}
        >
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
