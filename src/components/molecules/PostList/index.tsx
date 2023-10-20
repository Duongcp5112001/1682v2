
import React, { useState } from 'react'
import { usePosts } from '~/hooks/usePost';


import { PARAMS_FILTER } from '~/utils/constant';
import { getCookie } from '~/utils/cookie';
import loadable from '~/utils/loadable';

const PostList = loadable(() => import('~/components/molecules/PostList/List'));

const NewFeed = () => {
  const memberId = getCookie('userId')
  const { data, isLoading, isFetching, refetch } = usePosts({memberId})

  return (
    <>
      <PostList 
        dataPosts={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </>
  )
}

export default NewFeed