import { sendDelete, sendGet, sendPost, sendPut } from '~/utils/axios';

export const getPosts = (params: any) => sendGet('/member/get-posts', params);
export const getPostDetail = (postId: string) => sendGet(`/posts/${postId}/view-posts`);

export const setPost = (params: any) => sendPost('/member/create-posts', params);
export const updatePost = (postId: string, params: any) => sendPut(`/post/${postId}/update`, params);

export const updateActionPost = (postId: string, action: string) => sendPut(`/posts/${postId}/like-dislike/${action}`);
export const setCommentPost = (postId: string, params: any) => sendPut(`/posts/${postId}/comment-posts`, params);
export const editPostComment = (postId: string, commentId: string, params: any) => sendPut(`/posts/${postId}/comment/${commentId}/edit`, params)
export const deletePostComment = (postId: string, commentId: string) => sendDelete(`/post/${postId}/delete-comment/${commentId}`);