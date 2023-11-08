import { sendDelete, sendGet, sendPost, sendPut } from "~/utils/axios";

export const createGroup = (params: any) => sendPost('/member/create-group', params);
export const getGroups = () => sendGet('/member/get-list-groups');
export const joinGroup = (groupId: any, memberId: any) => sendPut(`/group/${groupId}/member/${memberId}/accept-join-request`);
export const unjoinGroup = (groupId: any, memberId: any) => sendPut(`/group/${groupId}/member/${memberId}/unjoin-group`);
export const deleteGroup = (groupId: any) => sendDelete(`/group/${groupId}/delete`);

export const createPost = (groupId: any,params: any) => sendPost(`/member/${groupId}/create-posts`, params);
export const getGroupDetailByID = (groupId: any) => sendGet(`/group/${groupId}/get-group-by-id`);
