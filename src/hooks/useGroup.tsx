import { useQuery } from '@tanstack/react-query';
import { getGroupDetailByID, getGroups } from '~/api/groups';

export const QK_GROUPS = 'groups';
export const QK_GROUP_DETAIL = 'groups/detail';

export function useGroups(token: any) {
  const res = useQuery([QK_GROUPS], () => getGroups(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}

export function useGroupDetail(groupId: any) {
  const res = useQuery([QK_GROUP_DETAIL], () => getGroupDetailByID(groupId), {
    enabled: Boolean(groupId),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}