import { sendGet } from "~/utils/axios";

export const getGroups = () => sendGet('/member/get-list-groups');