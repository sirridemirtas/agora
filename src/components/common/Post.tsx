"use client";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import {
  Bookmark,
  Ellipsis,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface PostProps {
  content: string;
  timestamp: string;
  university: string;
  username?: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  isPrivate: boolean;
}

const Post = ({
  content,
  timestamp,
  university,
  username,
  upvotes,
  downvotes,
  commentsCount,
  isPrivate,
}: PostProps) => {
  const { isLoggedIn } = useAuth();

  function requireLogin(func: (...args: unknown[]) => void) {
    return (...args: unknown[]) => {
      if (!isLoggedIn) {
        console.warn("Bu işlemi yapmak için izniniz yok. Giriş yapılmamış!");
        return;
      }
      return func(...args);
    };
  }

  const onUpvote = requireLogin(() => {
    console.log("Upvoted");
  });

  const onDownvote = requireLogin(() => {
    console.log("Downvoted");
  });

  const onComment = requireLogin(() => {
    console.log("Commented");
  });

  return (
    <article
      className="
      px-6 py-4 pb-2

      bg-white dark:bg-slate-800
      _hover:bg-neutral-100
      _cursor-pointer
      transition-colors duration-200 ease-in-out
      border-t border-neutral-200

      sm:rounded-xl sm:shadow-sm sm:mb-4 sm:border-none
    "
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          {!isPrivate && username ? (
            <span className="font-medium">{username}</span>
          ) : (
            <span className="text-neutral-500">Anonim</span>
          )}
          <span className="text-neutral-400 mx-2">·</span>
          <span className="text-neutral-500">{university}</span>
        </div>
        <time className="text-sm text-neutral-400">
          {formatDistanceToNow(new Date(timestamp), {
            locale: tr,
            addSuffix: true,
          })}
        </time>
      </div>

      <p className="text-neutral-800 mb-4">{content}</p>

      <div className="flex justify-between">
        <button
          className="flex items-center text-neutral-500"
          onClick={onUpvote}
        >
          <span className="p-2 rounded-3xl hover:bg-green-50 hover:text-green-700">
            <ThumbsUp size={18} />
          </span>
          <span className="text-sm">{upvotes}</span>
        </button>
        <button
          className="flex items-center text-neutral-500"
          onClick={onDownvote}
        >
          <span className="p-2 rounded-3xl hover:bg-red-100 hover:text-red-700">
            <ThumbsDown size={18} />
          </span>
          <span className="text-sm">{downvotes}</span>
        </button>
        <button
          className="flex items-center text-neutral-500"
          onClick={onComment}
        >
          <span className="p-2 rounded-3xl hover:bg-slate-300 hover:text-slate-700">
            <MessageSquare size={18} />
          </span>
          <span className="text-sm">{commentsCount}</span>
        </button>
        <span className="flex flex-row">
          <button className="flex items-center text-neutral-500">
            <span className="p-2 rounded-3xl hover:bg-blue-100 hover:text-blue-700">
              <Bookmark size={18} />
            </span>
          </button>
          <button className="flex items-center text-neutral-500">
            <span className="p-2 rounded-3xl hover:bg-blue-100 hover:text-blue-700">
              <Ellipsis size={18} />
            </span>
          </button>
        </span>
      </div>
    </article>
  );
};

export default Post;
