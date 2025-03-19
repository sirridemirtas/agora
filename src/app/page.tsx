import { Metadata } from "next";
import HomeFeed from "@/components/feed/HomeFeed";
import { CreatePost } from "@/components/common";

export const metadata: Metadata = {
  title: "Ana Sayfa",
};

export default function Home() {
  return (
    <>
      <CreatePost />
      <HomeFeed />
    </>
  );
}
