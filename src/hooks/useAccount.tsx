import { useQuery } from '@tanstack/react-query';
import { getAccountList } from '~/api/admin';

export const QK_ACCOUNT = 'account';

export function useAccountList(token: any) {
  const res = useQuery([QK_ACCOUNT], () => getAccountList(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}