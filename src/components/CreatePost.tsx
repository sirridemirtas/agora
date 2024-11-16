"use client";

import { Send } from "lucide-react";
import { useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const maxLength = 280;

  return (
    <div
      className="
      bg-white p-4
      sm:rounded-xl sm:shadow-sm sm:mb-6"
    >
      <form className="flex flex-col gap-4">
        <textarea
          className="
          w-full resize-none
          rounded-lg p-3 border border-neutral-200
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Düşüncelerini paylaş..."
          rows={3}
          maxLength={maxLength}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            {content.length}/{maxLength}
          </span>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <Send size={18} />
            Paylaş
          </button>
        </div>
      </form>
    </div>
  );
}
