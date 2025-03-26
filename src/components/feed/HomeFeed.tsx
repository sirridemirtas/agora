"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { PostService } from "@/services/PostService";
import { useApi } from "@/hooks";
import { PostList } from "@/components/common";
import { Alert, Loader } from "@/components/ui";
import { useNewPost } from "@/contexts/NewPostPlaceholder";
import { PAGE_SIZE } from "@/constants";
import { Post } from "@/types";

const HomeFeed = () => {
  const postService = new PostService();
  const [page, setPage] = useState<number>(1); // Start with page 1 for initial API call
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { posts: newPosts } = useNewPost();

  const {
    data: posts,
    loading,
    error,
    execute: fetchPosts,
  } = useApi((page?: number) => postService.getPosts(page)); // Page parameter is optional

  // Initial load - no page param will load page 1
  useEffect(() => {
    fetchPosts();
  }, []);

  // Update allPosts when posts data changes
  useEffect(() => {
    if (posts) {
      if (page === 1) {
        setAllPosts(posts);
      } else {
        // Ensure we don't duplicate posts by filtering out any existing ones
        const newUniquePost = posts.filter(
          (newPost) =>
            !allPosts.some((existingPost) => existingPost.id === newPost.id)
        );
        setAllPosts((prevPosts) => [...prevPosts, ...newUniquePost]);
      }

      // Check if we've reached the end
      setHasMore(posts.length === PAGE_SIZE);
    }
  }, [posts, page]);

  // Setup intersection observer for infinite scrolling
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loading && hasMore) {
        // Next page should be current page + 1
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage); // Explicitly specify the page number
      }
    },
    [loading, hasMore, page, fetchPosts]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  if (error && page === 1) {
    return (
      <Alert
        type="error"
        title="Gönderiler alınırken bir hata oluştu!"
        message={error.message}
        className="mx-6"
      />
    );
  }

  if (!allPosts?.length && !loading) {
    return (
      <Alert
        type="info"
        title="Bu sayfada henüz gönderi paylaşılmamış"
        message={"Kullanıcılar gönderi paylaşınca burada görünecek."}
        className="mx-6"
      />
    );
  }

  // Create display posts with unique IDs
  const displayPosts =
    newPosts.length > 0
      ? [
          ...newPosts,
          ...allPosts.filter(
            (post) => !newPosts.some((newPost) => newPost.id === post.id)
          ),
        ]
      : allPosts;

  return (
    <>
      <PostList posts={displayPosts} />
      <div ref={loaderRef} className="py-4 text-center">
        {loading && <Loader size={24} />}
        {!hasMore && !loading && allPosts.length > 0 && (
          <p className="text-sm text-neutral-500">Tüm gönderiler yüklendi</p>
        )}
      </div>
    </>
  );
};

export default HomeFeed;
