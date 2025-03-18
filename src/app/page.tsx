import { Metadata } from "next";
import HomeFeed from "@/components/feed/HomeFeed";
import { CreatePost, FeedFilters } from "@/components/common";

export const metadata: Metadata = {
  title: "Ana Sayfa",
};

export default function Home() {
  return (
    <>
      <FeedFilters /* className="sm:sticky sm:top-16 z-10" */ />
      <CreatePost />
      <HomeFeed />
    </>
  );
}
