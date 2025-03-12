"use client";
import { MOCK_POSTS } from "@/constants/posts";
import { PostList } from "@/components/common";

const HomeFeed = () => {
  return (
    <div>
      <PostList posts={MOCK_POSTS} />
    </div>
  );
};

export default HomeFeed;
