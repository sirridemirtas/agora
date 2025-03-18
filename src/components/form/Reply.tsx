"use client";
import clsx from "clsx";
import { Send } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Textarea, Alert } from "@/components/ui";
import { PostService, CreatePostDto } from "@/services/PostService";
import { useApi } from "@/hooks";

interface ReplyProps {
  className?: string;
  onReplyCreated?: () => void;
}

const Reply = ({ className, onReplyCreated }: ReplyProps) => {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [commentActionsVisible, setCommentActionsVisible] = useState(false);
  const maxLength = 500;
  const postService = new PostService();
  const pathname = usePathname();
  const postId = pathname.split("/")[2]; // Extract post ID from URL

  const {
    loading,
    error,
    execute: createReply,
  } = useApi((data: CreatePostDto) => postService.createPost(data));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    try {
      const response = await createReply({
        content: trimmedContent,
        replyTo: postId,
      });

      if (response.data && !response.error) {
        // Reset form content
        setContent("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);

        // Reset textarea height safely
        if (e.currentTarget) {
          const textarea = e.currentTarget.querySelector("textarea");
          if (textarea) {
            textarea.style.height = "auto";
          }
        }

        // Callback for potential refresh after reply creation
        if (onReplyCreated) {
          onReplyCreated();
        }
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error("Failed to create reply:", err);
      setSuccess(false);
    }
  };

  const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.scrollTop = 0;
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 2 + "px";
    setCommentActionsVisible(true);
  };

  return (
    <div className={clsx("py-4", className)}>
      {success && (
        <Alert
          type="success"
          message="Cevabınız başarıyla paylaşıldı."
          className="mb-4"
        />
      )}
      {error && (
        <Alert
          type="error"
          title="Cevap paylaşılırken bir hata oluştu"
          message={error.message}
          className="mb-4"
        />
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Textarea
          name="content"
          onInput={resize}
          onFocus={resize}
          placeholder="Cevabını yaz"
          rows={2}
          maxLength={maxLength}
          minLength={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={loading}
        />
        <div
          className={clsx(
            "flex items-center justify-end gap-4 bg-white dark:bg-neutral-950",
            content && "sticky sm:bottom-16 lg:bottom-0",
            commentActionsVisible || "hidden"
          )}
        >
          <span className="text-sm text-neutral-500">
            {content.length}/{maxLength}
          </span>
          <Button icon={Send} type="submit" disabled={loading}>
            Cevapla
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Reply;
