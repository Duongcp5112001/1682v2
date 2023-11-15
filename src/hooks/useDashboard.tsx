import { useQuery } from '@tanstack/react-query';
import { getInfoDashboard } from '~/api/dashboad';

export const QK_DASHBOARD = 'dashboard';

export function useDashboard(token: any) {
  const res = useQuery([QK_DASHBOARD], () => getInfoDashboard(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}