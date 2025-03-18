"use client";
import clsx from "clsx";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button, Textarea, Alert } from "@/components/ui";
import { PostService, CreatePostDto } from "@/services/PostService";
import { useApi } from "@/hooks";

interface CreatePostProps {
  className?: string;
  onPostCreated?: () => void;
}

const CreatePost = ({ className, onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const maxLength = 500;
  const postService = new PostService();

  const {
    loading,
    error,
    execute: createPost,
  } = useApi((data: CreatePostDto) => postService.createPost(data));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    try {
      const response = await createPost({ content: trimmedContent });

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

        // Callback to refresh feed or perform other actions after post creation
        if (onPostCreated) {
          onPostCreated();
        }
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error("Failed to create post:", err);
      // Hata durumunda success kesinlikle false olmalı
      setSuccess(false);
    }
  };

  const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.scrollTop = 0;
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 2 + "px";
  };

  return (
    <div className={clsx("p-6", className)}>
      {success && (
        <Alert
          type="success"
          message="Gönderinizi başarıyla paylaştınız."
          className="mb-4"
        />
      )}
      {error && (
        <Alert
          type="error"
          title="Gönderi paylaşılırken bir hata oluştu"
          message={error.message}
          className="mb-4"
        />
      )}

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
          disabled={loading}
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
          <Button icon={Send} type="submit" disabled={loading}>
            Paylaş
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
