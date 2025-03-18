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
    <div className="mb-4 flex flex-col pb-2">
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            bordered={posts.indexOf(post) === posts.length - 1}
          />
        ))
      )}
    </div>
  );
}
