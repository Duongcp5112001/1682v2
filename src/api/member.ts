import { sendGet, sendPost, sendPut } from "~/utils/axios";

export const getMemberInfo = () => sendGet(`/member/get-profile`);
export const getMemberInfoById = (memberId: any) => sendPost(`/member/get-member-by-id`, memberId);
export const getPostsByMemberId = (params: any) => sendPost('/member/get-post-by-member-id', params);
export const getFriendList = () => sendGet(`/member/get-friend-list`);

export const updateProfile = (accountId: any, params: any) => sendPut(`/member/${accountId}/update-profile`, params);
export const updateAvatar = (accountId: any, params: any) => sendPut(`/member/${accountId}/update-avatar`, params);
export const updateCoverImage = (accountId: any, params: any) => sendPut(`/member/${accountId}/update-cover-image`, params);



