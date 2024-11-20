"use client";
import PageTitle from "@/components/common/PageTitle";
import CreatePost from "@/components/common/CreatePost";
import Post from "@/components/common/Post";
import { House } from "lucide-react";
import { MOCK_POSTS } from "@/constants/posts";

export default function Home() {
  return (
    <div className="">
      <PageTitle title="Ana Sayfa" icon={House} />
      <CreatePost />
      <div className="sm:space-y-4">
        {MOCK_POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
