import { Post as PostType } from "@/types";
import { Post } from "@/components/common";
import { Loader } from "@/components/ui";

export default function PostList({
  posts,
  loading = false,
}: {
  posts: PostType[];
  loading?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </div>
  );
}
