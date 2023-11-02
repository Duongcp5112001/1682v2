import React, { useEffect, useState } from 'react'
import { Avatar, Card, Dropdown, Form, Popover, Statistic, message } from 'antd'
import {
  LikeOutlined,
  MessageOutlined,
  DislikeOutlined,
  CheckOutlined,
  CloseOutlined,
  EllipsisOutlined,
  LikeTwoTone,
  DislikeTwoTone
} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import loadable from '~/utils/loadable';

import { format } from 'date-fns';
import { DATE, SUCCESS } from '~/utils/constant';
import { useAppSelector } from '~/store';
import { TextArea } from '~/components/atoms/Input';
import styles from './styles.module.scss'

import { deletePostComment, setCommentPost, updateActionPost } from '~/api/post';
import ModalEditComment from '~/components/atoms/ModalEditComment';
import { usePostByMemberId, usePostDetail } from '~/hooks/usePost';
import defaultUser from '~/assets/images/defaultUser.png'

import Spin from '~/components/atoms/Spin';
import PostList from '../../PostList/List';
import CreatePost from '../../CreatePost';
// import ModalPost from '../PostsList/PostModal';

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