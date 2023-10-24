import { sendGet } from "~/utils/axios";

export const getAdsList = () => sendGet('/ads/get-list-ads');
