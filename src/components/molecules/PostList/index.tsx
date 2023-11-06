
import React, { useMemo } from 'react';
import { usePosts } from '~/hooks/usePost';

import { getCookie } from '~/utils/cookie';
import loadable from '~/utils/loadable';

const PostList = loadable(() => import('~/components/molecules/PostList/List'));
const CreatePost = loadable(() => import('~/components/molecules/CreatePost'));

const NewFeed = () => {
  const memberId = getCookie('userId')
  const { data, isLoading, isFetching, refetch } = usePosts({memberId})
  const posts = data?.data?.posts

  return (
    <div>
      <CreatePost
        afterSuccess={refetch}
      />
      <PostList 
        dataPosts={posts}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  )
}

export default NewFeed