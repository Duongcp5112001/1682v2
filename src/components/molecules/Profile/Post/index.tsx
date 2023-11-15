import React from 'react'

import { usePostByMemberId } from '~/hooks/usePost';
import PostList from '../../PostList/List';
import CreatePost from '../../CreatePost';
import { useAppSelector } from '~/store';

interface Props {
  memberId?: any;
}

const Post = (props: Props) => {
  const { memberId } = props;

  const {data, isLoading, isFetching, refetch} = usePostByMemberId({memberId})
  const userData = useAppSelector((state) => state.userInfo.userData);

  const dataPosts = data?.posts;
  return (
    <>
      { userData?._id && userData._id === memberId ?
        <CreatePost
          afterSuccess={refetch}
        />
        : null
      }
      <PostList
        dataPosts={dataPosts}
        isLoading={isLoading}
        isFetching={isFetching}
        maxHeight='50vh'
        refetch={refetch}
      />
    </>
  )
}




export default Post