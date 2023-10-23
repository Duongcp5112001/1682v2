
import { useQuery } from '@tanstack/react-query';
import { getFriendList } from '~/api/member';

export const QK_FRIEND = 'friends';

export function useFriends(token: any) {
  const res = useQuery([QK_FRIEND], () => getFriendList(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}