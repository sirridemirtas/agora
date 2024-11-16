import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

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

export default function Post({
  content,
  timestamp,
  university,
  username,
  upvotes,
  downvotes,
  commentsCount,
  isPrivate,
}: PostProps) {
  return (
    <article
      className="bg-white sm:rounded-xl px-6 py-4 sm:shadow-sm sm:mb-4 max-w-screen-md dark:bg-black border-t border-neutral-200 sm:border-none
      hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 ease-in-out
      cursor-pointer
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
        <button className="flex items-center gap-1 text-neutral-500 hover:text-blue-500">
          <ThumbsUp size={18} />
          <span className="text-sm">{upvotes}</span>
        </button>
        <button className="flex items-center gap-1 text-neutral-500 hover:text-red-500">
          <ThumbsDown size={18} />
          <span className="text-sm">{downvotes}</span>
        </button>
        <button className="flex items-center gap-1 text-neutral-500">
          <MessageSquare size={18} />
          <span className="text-sm">{commentsCount}</span>
        </button>
      </div>
    </article>
  );
}
