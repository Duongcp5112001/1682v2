import { useQuery } from '@tanstack/react-query';
import { getAdsList } from '~/api/ads';

export const QK_ADS = 'ads';

export function useAdsList(token: any) {
  const res = useQuery([QK_ADS], () => getAdsList(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}