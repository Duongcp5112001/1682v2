import { sendGet, sendPost, sendPut } from "~/utils/axios";

export const getQuestion = (params: any) => sendPost('/member/reset-password', params);
export const resetPassword = (memberId: any ,params: any) => sendPut(`/member/${memberId}/update-password`, params)
export const getListQuestion = () => sendGet(`/get-list-question`)
