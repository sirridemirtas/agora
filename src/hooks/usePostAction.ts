import { PostActionService } from '@/services/PostActionService';
import { useAuth } from './useAuth';
import { useApi } from './useApi';

export function usePostAction() {
  const postActionService = new PostActionService();
  const { isLoggedIn } = useAuth();
  
  const { execute: executeLikePost, loading: likeLoading } = useApi(postActionService.likePost.bind(postActionService));
  const { execute: executeDislikePost, loading: dislikeLoading } = useApi(postActionService.dislikePost.bind(postActionService));
  const { execute: executeUnlikePost, loading: unlikeLoading } = useApi(postActionService.unlikePost.bind(postActionService));
  const { execute: executeUndislikePost, loading: undislikeLoading } = useApi(postActionService.undislikePost.bind(postActionService));

  const likePost = async (postId: string) => {
    if (!isLoggedIn) return null;
    return await executeLikePost(postId);
  };

  const dislikePost = async (postId: string) => {
    if (!isLoggedIn) return null;
    return await executeDislikePost(postId);
  };

  const unlikePost = async (postId: string) => {
    if (!isLoggedIn) return null;
    return await executeUnlikePost(postId);
  };

  const undislikePost = async (postId: string) => {
    if (!isLoggedIn) return null;
    return await executeUndislikePost(postId);
  };

  return {
    likePost,
    dislikePost,
    unlikePost,
    undislikePost,
    loading: likeLoading || dislikeLoading || unlikeLoading || undislikeLoading
  };
}
