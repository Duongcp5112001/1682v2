import { sendGet, sendPut } from "~/utils/axios";

export const getAdsList = () => sendGet("/ads/get-list-ads");
export const adsClick = (adsId: any) => sendPut(`/ads/${adsId}/view-ads`);
