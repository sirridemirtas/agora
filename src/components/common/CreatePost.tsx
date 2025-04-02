"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Send, School } from "lucide-react";
import { universities, indeEki } from "@/constants/universities";
import { Button, Alert, Textarea } from "@/components/ui";
import { PostService, CreatePostDto } from "@/services/PostService";
import { useAuth, useApi } from "@/hooks";
import { useNewPost } from "@/contexts/NewPostPlaceholder";
import Avatar from "./Avatar";
import { MIN_POST_LENGTH, MAX_POST_LENGTH } from "@/constants";
import Link from "next/link";

interface CreatePostProps {
  className?: string;
  onPostCreated?: () => void;
}

const CreatePost = ({ className, onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
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

  const contentValid =
    content.trim().length >= MIN_POST_LENGTH &&
    content.length <= MAX_POST_LENGTH;

  return (
    <div className={clsx("p-4 sm:p-6", className)}>
      {success && <></>}
      {error && (
        <Alert
          type="error"
          title="Gönderi paylaşılırken bir hata oluştu"
          message={error.message}
          className="mb-4"
        />
      )}

      <form className="flex flex-col gap-2 sm:gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-row items-start justify-start gap-2">
          <Avatar size={12} username={username || ""} />
          <Textarea
            name="content"
            placeholder={
              "Kampüste neler oluyor, @" + (username || "anonim") + "?"
            }
            rows={3}
            maxLength={MAX_POST_LENGTH}
            minLength={MIN_POST_LENGTH}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
            nostyle
            className={clsx(
              "focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0",
              "box-border flex-1 resize-none rounded-none border-b border-neutral-200 bg-transparent pt-3 text-lg dark:border-neutral-800"
            )}
            autosize
          />
        </div>
        <div
          className={clsx(
            "flex flex-col items-center justify-between gap-2 bg-white sm:flex-row md:pl-14 dark:bg-neutral-950",
            content && "sticky sm:bottom-16 lg:bottom-0"
          )}
        >
          <div className="flex w-full items-center justify-start gap-2 sm:items-start">
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
            <div className="flex flex-col text-sm text-gray-500">
              <small>Burada paylaşılacak:</small>
              <span>
                {universities.filter(
                  (u) => u.id === (pathId || universityId)
                )[0]?.name || "Üniversite"}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-nowrap items-center justify-end gap-4 sm:w-auto">
            <span className="text-sm text-neutral-500">
              {content.length}/{MAX_POST_LENGTH}
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

const NotLoggedIn = () => {
  const pathname = usePathname();
  const universityId = pathname.split("/")[2];
  const universityName = universities.find((u) => u.id === universityId)?.name;

  return (
    <div className="m-4 rounded-lg bg-neutral-100 p-4 md:m-6 dark:bg-neutral-800">
      {universityName ? (
        <>
          <span>{universityName}</span>
          &apos;{indeEki(universityName)}
        </>
      ) : (
        "Üniversite sayfalarında"
      )}{" "}
      paylaşım yapmak ve cevaplamak için{" "}
      <Link href={"/login"} className="font-semibold hover:underline">
        giriş yap
      </Link>{" "}
      veya{" "}
      <Link href={"/register"} className="font-semibold hover:underline">
        kaydol
      </Link>
      .
    </div>
  );
};

const CreatePostWrapper = (props: CreatePostProps) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  return <CreatePost {...props} />;
};

export default CreatePostWrapper;
