import { useQuery } from '@tanstack/react-query';
import { getMemberInfo, getMemberInfoById } from '~/api/member';


export const QK_MEMBER = 'member';
export const QK_MEMBERBYID = 'member/id';

export function useMember(token: any) {
  const res = useQuery([QK_MEMBER], () => getMemberInfo(), {
    enabled: Boolean(token),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}

export function useMemberById(params: any) {
  const res = useQuery([QK_MEMBERBYID, {params}], () => getMemberInfoById(params), {
    enabled: Boolean(params),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  return res;
}