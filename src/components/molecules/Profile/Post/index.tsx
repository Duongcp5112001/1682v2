import React from 'react'

import { usePostByMemberId } from '~/hooks/usePost';
import PostList from '../../PostList/List';

interface Props {
  memberId?: any;
}

const Post = (props: Props) => {
  const { memberId } = props;

  const {data, isLoading, isFetching, refetch} = usePostByMemberId({memberId})

  const dataPosts = data?.posts;
  return (
      <PostList
        dataPosts={dataPosts}
        isLoading={isLoading}
        isFetching={isFetching}
        maxHeight='50vh'
        refetch={refetch}
      />
  )
}




export default Post