"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useApi } from "@/hooks";
import { PostList } from "@/components/common";
import { Alert, Loader } from "@/components/ui";
import { useNewPost } from "@/contexts/NewPostPlaceholder";
import { PAGE_SIZE } from "@/constants";
import { ApiResponse } from "@/services/types";
import { Post } from "@/types";

interface BaseFeedProps {
  fetchFunction: (page?: number) => Promise<ApiResponse<Post[]>>;
  emptyTitle: string;
  emptyMessage: string;
  filterNewPosts?: (posts: Post[]) => Post[];
  initialPage?: number;
}

const BaseFeed = ({
  fetchFunction,
  emptyTitle,
  emptyMessage,
  filterNewPosts,
  initialPage = 1,
}: BaseFeedProps) => {
  const [page, setPage] = useState<number>(initialPage);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

  const { posts: newPosts } = useNewPost();

  // Get filtered new posts
  const filteredNewPosts = filterNewPosts ? filterNewPosts(newPosts) : newPosts;

  const {
    data: posts,
    loading,
    error,
    execute: fetchPosts,
  } = useApi((page?: number) => fetchFunction(page));

  // Initial load
  useEffect(() => {
    fetchPosts(initialPage);
  }, [initialPage]);

  // Update allPosts when posts data changes
  useEffect(() => {
    // Mark as loaded even if posts is null or empty array
    // This ensures we show the empty state when the API returns no posts
    if (posts !== undefined) {
      if (page === initialPage) {
        setAllPosts(posts || []);
        setInitialLoaded(true);
      } else if (posts) {
        // Ensure we don't duplicate posts
        const newUniquePosts = posts.filter(
          (newPost) =>
            !allPosts.some((existingPost) => existingPost.id === newPost.id)
        );
        setAllPosts((prevPosts) => [...prevPosts, ...newUniquePosts]);
      }

      // Check if we've reached the end
      setHasMore(posts?.length === PAGE_SIZE);
    }
  }, [posts, page, initialPage]);

  // Setup intersection observer for infinite scrolling
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (
        target.isIntersecting &&
        !loading &&
        hasMore &&
        initialLoaded &&
        allPosts.length > 0
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    },
    [loading, hasMore, page, fetchPosts, initialLoaded, allPosts.length]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loaderRef.current && hasMore) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [handleObserver, hasMore]);

  // Show error if there is one
  if (error && page === initialPage) {
    return (
      <Alert
        type="error"
        title="Gönderiler alınırken bir hata oluştu!"
        message={error.message}
        className="mx-6"
      />
    );
  }

  // Show loader when initially loading and no new filtered posts
  if (loading && !initialLoaded && filteredNewPosts.length === 0) {
    return (
      <div className="py-8 text-center">
        <Loader size={32} />
      </div>
    );
  }

  // Display empty state when:
  // 1. Initial API call has completed (initialLoaded is true)
  // 2. API returned no posts (allPosts is empty)
  // 3. There are no new filtered posts to show
  const showEmptyState =
    initialLoaded && allPosts.length === 0 && filteredNewPosts.length === 0;

  // Important: Check for empty state AFTER checking for loading state
  if (showEmptyState) {
    return (
      <Alert
        type="info"
        title={emptyTitle}
        message={emptyMessage}
        className="mx-6"
      />
    );
  }

  // Create display posts with new posts at the top
  const displayPosts =
    filteredNewPosts.length > 0
      ? [
          ...filteredNewPosts,
          ...allPosts.filter(
            (post) =>
              !filteredNewPosts.some((newPost) => newPost.id === post.id)
          ),
        ]
      : allPosts;

  // Only show loader when we actually have posts from the API (not just new posts)
  const shouldShowLoader = hasMore && allPosts.length > 0;

  return (
    <>
      {displayPosts.length > 0 && <PostList posts={displayPosts} />}
      {shouldShowLoader && (
        <div ref={loaderRef} className="py-4 text-center">
          {loading && <Loader size={24} />}
        </div>
      )}
      {!hasMore && !loading && allPosts.length > 0 && (
        <p className="py-4 text-center text-sm text-neutral-500">
          Tüm gönderiler yüklendi
        </p>
      )}
    </>
  );
};

export default BaseFeed;
