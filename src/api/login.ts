import { sendPost } from "~/utils/axios";

export const setLogin = (params: any) => sendPost('/login', params);
export const setGuestLogin = (params: any) => sendPost(`/login-no-password`, params)
