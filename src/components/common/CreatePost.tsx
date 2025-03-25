"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Send, School } from "lucide-react";
import { Textarea } from "@headlessui/react";
import { universities } from "@/constants/universities";
import { Button, Alert } from "@/components/ui";
import { PostService, CreatePostDto } from "@/services/PostService";
import { useAuth, useApi } from "@/hooks";
import { useNewPost } from "@/contexts/NewPostPlaceholder";
import Avatar from "./Avatar";

interface CreatePostProps {
  className?: string;
  onPostCreated?: () => void;
}

const CreatePost = ({ className, onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const maxLength = 500;
  const postService = new PostService();
  const { addPost: addNewPostToPlaceholder } = useNewPost();

  const { universityId, username } = useAuth();
  const pathId = usePathname().split("/")[2];

  const {
    loading,
    error,
    execute: createPost,
  } = useApi((data: CreatePostDto) => postService.createPost(data));

  const [imageError, setImageError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    try {
      const response = await createPost({
        content: trimmedContent,
        universityId: pathId || null,
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

        // Callback to refresh feed or perform other actions after post creation
        if (onPostCreated) {
          onPostCreated();
        }

        addNewPostToPlaceholder(response.data);
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
    e.target.style.height = e.target.scrollHeight + 1 + "px";
  };

  const contentValid =
    content.trim().length >= 3 && content.length <= maxLength;

  return (
    <div className={clsx("p-6", className)}>
      {
        success && <></> /* (
        <Alert
          type="success"
          message="Gönderinizi başarıyla paylaştınız."
          className="mb-4"
        />
      ) */
      }
      {error && (
        <Alert
          type="error"
          title="Gönderi paylaşılırken bir hata oluştu"
          message={error.message}
          className="mb-4"
        />
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-row items-start justify-start gap-2">
          <Avatar size={12} username={username || ""} />
          <Textarea
            name="content"
            onInput={resize}
            placeholder={"Ne düşünüyorsun, @" + (username || "anonim") + "?"}
            rows={3}
            maxLength={maxLength}
            minLength={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
            className={clsx(
              "focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0",
              "box-border flex-1 resize-none border-b border-neutral-200 bg-transparent pt-3 text-lg dark:border-neutral-800"
            )}
          />
        </div>
        <div
          className={clsx(
            "flex items-center justify-between gap-2 bg-white pl-14 dark:bg-neutral-950",
            content && "sticky sm:bottom-16 lg:bottom-0"
          )}
        >
          <div className="flex items-center gap-2">
            {imageError ? (
              <div className="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
                <School className="text-neutral-600 dark:text-neutral-300" />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://www.studyinturkiye.gov.tr/Content/img/logo/${pathId || universityId}.png`}
                alt="avatar"
                className="pointer-events-none h-12 w-12 rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            )}{" "}
            <span className="flex flex-col text-sm text-gray-500">
              <small>Burada paylaşılacak:</small>
              <span>
                {universities.filter(
                  (u) => u.id === (pathId || universityId)
                )[0]?.name || "Üniversite"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">
              {content.length}/{maxLength}
            </span>
            {pathId && pathId !== universityId && (
              <input type="hidden" name="universityId" value={pathId} />
            )}
            <Button
              icon={Send}
              type="submit"
              disabled={loading || !contentValid}
            >
              Paylaş
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
