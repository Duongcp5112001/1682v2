import { sendGet, sendPost, sendPut } from "~/utils/axios";

export const getMemberInfo = () => sendGet(`/member/get-profile`);
export const getMemberInfoById = (memberId: any) => sendPost(`/member/get-member-by-id`, memberId);
export const getPostsByMemberId = (params: any) => sendPost('/member/get-post-by-member-id', params);
export const getFriendList = () => sendGet(`/member/get-friend-list`);

export const search = (params: any) => sendGet(`/search`, params);

export const updateProfile = (accountId: any, params: any) => sendPut(`/member/${accountId}/update-profile`, params);
export const updateAvatar = (accountId: any, params: any) => sendPut(`/member/${accountId}/update-avatar`, params);
export const updateCoverImage = (accountId: any, params: any) => sendPut(`/member/${accountId}/update-cover-image`, params);

export const getMessages = (receiver: string) => sendGet("/member/messages", { receiver });
export const sendMessage = (receiver: string, content: string) => sendPut(`/member/chat/${receiver}`, { content });
export const getAllMessages = () => sendGet("/member/all-messages");

