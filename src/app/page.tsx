"use client";
import PageTitle from "@/components/common/PageTitle";
import CreatePost from "@/components/common/CreatePost";
import Post from "@/components/common/Post";
import { House } from "lucide-react";
import { MOCK_POSTS } from "@/constants/posts";
import { useAuth } from "@/hooks/useAuth";
import DialogExample from "@/components/ui/DialogExample";

export default function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="">
      <PageTitle title="Ana Sayfa" icon={House} />
      {/* <DialogExample /> */}
      {isLoggedIn && <CreatePost />}
      <div className="sm:space-y-4">
        {MOCK_POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
