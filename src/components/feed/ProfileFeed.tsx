"use client";
import { useParams } from "next/navigation";
import { PostService } from "@/services/PostService";
import BaseFeed from "./BaseFeed";

interface ProfileFeedProps {
  username?: string;
}

const ProfileFeed = ({ username: propUsername }: ProfileFeedProps) => {
  const params = useParams();
  // Use prop username if provided, otherwise try to get it from params
  const username = propUsername || (params?.username as string);
  const postService = new PostService();

  return (
    <BaseFeed
      fetchFunction={(page) => postService.getUserFeed(username, page)}
      emptyTitle={`${username} henüz gönderi paylaşmamış`}
      emptyMessage="Kullanıcı gönderi paylaşınca burada görünecek."
    />
  );
};

export default ProfileFeed;
