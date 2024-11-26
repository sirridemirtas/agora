import { House } from "lucide-react";
import { HomeFeed } from "@/components/feed";
import { CreatePost, PageTitle } from "@/components/common";

export default function Home() {
  return (
    <div className="lg:flex-1">
      <PageTitle title="Ana Sayfa" icon={House} />
      <CreatePost />
      <HomeFeed />
    </div>
  );
}
