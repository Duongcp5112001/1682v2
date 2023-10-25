import { sendPost } from "~/utils/axios";

export const setRegister = (params: any) => sendPost('/register', params);
