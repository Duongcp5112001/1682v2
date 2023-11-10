import { sendDelete, sendGet, sendPost, sendPut } from "~/utils/axios";

export const getAccountList = () => sendGet(`/admin/get-list-members`);


export const activeGroup = (groupId: any) => sendPut(`/admin/${groupId}/active-group`);
export const inactiveGroup = (groupId: any) => sendPut(`/admin/${groupId}/deactive-group`);


export const activeMember = (memberId: any) => sendPut(`/admin/${memberId}/active-account`);
export const inactiveMember = (memberId: any) => sendPut(`/admin/${memberId}/deactive-account`);


export const createAds = (params: any) => sendPost(`/ads/create-ads`, params);
export const updateAds = (adsId: any, params: any) => sendPut(`/ads/${adsId}/update-ads`, params);
export const activeAd = (adsId: any) => sendPut(`/admin/ads/${adsId}/active-ads`);
export const inactiveAd = (adsId: any) => sendPut(`/admin/ads/${adsId}/deactive-ads`);
export const deleteAds = (adsId: any) => sendDelete(`/ads/${adsId}/delete`);
