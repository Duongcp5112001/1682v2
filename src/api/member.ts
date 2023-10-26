import { sendGet, sendPost } from "~/utils/axios";

export const getMemberInfo = () => sendGet(`/member/get-profile`);
export const getMemberInfoById = (memberId: any) => sendPost(`/member/get-member-by-id`, memberId);
export const getPostsByMemberId = (params: any) => sendPost('/member/get-post-by-member-id', params);
export const getFriendList = () => sendGet(`/member/get-friend-list`);


