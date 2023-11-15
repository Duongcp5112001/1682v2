import { useQuery } from '@tanstack/react-query';
import { fwordList } from '~/api/admin';

export const QK_F_WORD = 'fword'; //Query string. Dùng để refetch api sau khi CRUD 

export function useFwordList(token: any) {
  const res = useQuery([QK_F_WORD], () => fwordList(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}