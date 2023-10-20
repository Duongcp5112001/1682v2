import { sendGet, sendPost } from "~/utils/axios";

export const getMemberInfo = () => sendGet(`/member/get-profile`);
export const getMemberInfoById = (memberId: any) => sendPost(`/member/get-member-by-id`, memberId);
export const getPostByMemberId = (params: any) => sendGet(`/member/get-member-by-id`, params);



