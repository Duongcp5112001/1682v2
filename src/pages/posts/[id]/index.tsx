import React from 'react'
import { useParams } from 'react-router-dom';
import PostDetail from '~/components/molecules/PostDetail';

const PostDetails = () => {
  const { id } = useParams();
  return (
    <div className='overflow-y-scroll max-h-[90vh]'>
      <PostDetail postId={id}/>
    </div>
  );
}

export default PostDetails