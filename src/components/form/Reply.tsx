"use client";
import clsx from "clsx";
import { Send } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Textarea, Alert } from "@/components/ui";
import { PostService, CreatePostDto } from "@/services/PostService";
import { useApi, useAuth, useLoginModal } from "@/hooks";
import { useNewPost } from "@/contexts/NewPostPlaceholder";
import { MAX_REPLY_LENGTH, MIN_REPLY_LENGTH } from "@/constants";

interface ReplyProps {
  className?: string;
  onReplyCreated?: () => void;
}

const Reply = ({ className, onReplyCreated }: ReplyProps) => {
  const { isLoggedIn } = useAuth();
  const { openModal } = useLoginModal();

  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [replyActionsVisible, setReplyActionsVisible] = useState(false);
  const postService = new PostService();
  const pathname = usePathname();
  const postId = pathname.split("/")[2];

  const { addPost: addNewPostToPlaceholder } = useNewPost();

  const {
    loading,
    error,
    execute: createReply,
  } = useApi((data: CreatePostDto) => postService.createPost(data));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      openModal();
    }

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
        addNewPostToPlaceholder(response.data);
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error("Failed to create reply:", err);
      setSuccess(false);
    }
  };

  return (
    <div className={clsx("py-4", className)}>
      {
        success && <></> /*(
        <Alert
          type="success"
          message="Cevabınız başarıyla paylaşıldı."
          className="mb-4"
        />
      ) */
      }
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
          onInput={() => setReplyActionsVisible(true)}
          onFocus={() => setReplyActionsVisible(true)}
          autosize
          placeholder="Cevabını yaz"
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          minLength={MIN_REPLY_LENGTH}
          maxLength={MAX_REPLY_LENGTH}
          required
        />
        <div
          className={clsx(
            "flex items-center justify-end gap-4 bg-white dark:bg-neutral-950",
            content && "sticky sm:bottom-16 lg:bottom-0",
            replyActionsVisible || "hidden"
          )}
        >
          <span className="text-sm text-neutral-500">
            {content.length}/{MAX_REPLY_LENGTH}
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
