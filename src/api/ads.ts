import { sendGet } from "~/utils/axios";

export const getAdsList = () => sendGet('/ads/get-list-ads');
export const adsClick = (adsId: any) => sendGet(`/ads/${adsId}/view-ads`);
