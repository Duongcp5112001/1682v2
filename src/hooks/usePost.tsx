
import { useQuery } from '@tanstack/react-query';
import { getPostsByMemberId } from '~/api/member';
import { getPostDetail, getPosts } from '~/api/post';

export const QK_POSTS = 'posts';
export const QK_POSTS_BY_ID = 'post/memberId';
export const QK_POST_DETAIL = 'post/detail';
export function usePosts(params: any) {
  const res = useQuery([QK_POSTS, {params}], () => getPosts(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}
export function usePostByMemberId(params: any) {
  const res = useQuery([QK_POSTS_BY_ID, {params}], () => getPostsByMemberId(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}

export function usePostDetail(postId: any) {
  const res = useQuery([QK_POST_DETAIL, {postId}], () => getPostDetail(postId), {
    enabled: Boolean(postId),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}