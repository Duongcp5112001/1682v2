import { useQuery } from '@tanstack/react-query';
import { getListQuestion } from '~/api/resetPassword';

export const QK_QUESTION = 'security/question'; //Query string. Dùng để refetch api sau khi CRUD 

export function useQuestions(call: boolean) {
  const res = useQuery([QK_QUESTION], () => getListQuestion(), {
    enabled: call,
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}