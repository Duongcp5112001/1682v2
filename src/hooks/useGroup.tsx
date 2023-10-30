import { useQuery } from '@tanstack/react-query';
import { getGroups } from '~/api/groups';

export const QK_GROUPS = 'groups';

export function useGroups(token: any) {
  const res = useQuery([QK_GROUPS], () => getGroups(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}