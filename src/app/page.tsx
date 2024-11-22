"use client";
import { House } from "lucide-react";
import { MOCK_POSTS } from "@/constants/posts";
import { useAuth } from "@/hooks/useAuth";
import { CreatePost, PageTitle, Post } from "@/components/common";

export default function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="">
      <PageTitle title="Ana Sayfa" icon={House} />
      {isLoggedIn && <CreatePost />}
      <div className="sm:space-y-4">
        {MOCK_POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
