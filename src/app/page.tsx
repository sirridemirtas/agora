import { Metadata } from "next";
import { HomeFeed } from "@/components/feed";
import { CreatePost } from "@/components/common";

export const metadata: Metadata = {
  title: "Ana Sayfa | Agora",
};

export default function Home() {
  return (
    <>
      <CreatePost />
      <HomeFeed />
    </>
  );
}
