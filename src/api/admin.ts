import { sendGet } from "~/utils/axios";

export const getAccountList = () => sendGet(`/admin/get-list-members`);