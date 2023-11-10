import React from 'react'

import PostList from '../../PostList/List';
import CreatePost from '../../CreatePost';

interface Props {
  dataPost?: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}

const Post = (props: Props) => {
  const { dataPost, isFetching, isLoading, refetch } = props;
  const dataPosts = dataPost?.posts;
  return (
    <div className='mt-[130px]'>
      <CreatePost
        groupId={dataPost?.group?._id}
        afterSuccess={refetch}
      />
      <PostList
        dataPosts={dataPosts}
        isLoading={isLoading}
        isFetching={isFetching}
        maxHeight='43vh'
        refetch={refetch}
      />
    </div>
  )
}




export default Post