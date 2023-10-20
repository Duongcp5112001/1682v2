import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '~/api/notification';

export const QK_NOTI = 'notification';

export function useNotification() {
  const res = useQuery([QK_NOTI], () => getNotifications(), {
    enabled: true,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}