import { sendGet, sendPut } from "~/utils/axios";

export const getFriends = (params: any) => sendGet('/user/follows', params);
export const addFriend = (memberId: any, params: any) => sendPut(`/member/${memberId}/add-friend`, params);
export const unFriend = (userId: string) => sendPut(`/user/unfollow/${userId}`);
