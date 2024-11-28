"use client";
import { MOCK_POSTS } from "@/constants/posts";
import { Post } from "@/components/common";

const HomeFeed = () => {
  return (
    <div className="_sm:space-y-4">
      {MOCK_POSTS.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default HomeFeed;
