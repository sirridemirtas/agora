import { MOCK_POSTS } from "@/constants/posts";
import { MessageSquare } from "lucide-react";
import { PageTitle, Post as PostComponent } from "@/components/common";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find((p) => p.id === params.slug);

  if (!post) return <div>Post bulunamadı</div>;

  return (
    <div className="lg:flex-1">
      <PageTitle title="Gönderi Detayı" icon={MessageSquare} />
      <div className="max-w-4xl mx-auto">
        <PostComponent
          {...post}
        />
      </div>
    </div>
  );
}
