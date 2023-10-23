import React from 'react'
import CreatePost from '~/components/molecules/CreatePost';
import loadable from '~/utils/loadable';
import { Authorization } from '~/wrapper/Authorization';

const NewFeed = loadable(() => import('~/components/molecules/PostList'));

const NewFeeds = () => {
  return (
    <>
      <NewFeed/>
    </>
  )
}

export default NewFeeds