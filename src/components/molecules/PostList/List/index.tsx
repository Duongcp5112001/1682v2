import React, { useEffect, useState } from 'react'
import Spin from '~/components/atoms/Spin'
import List from '~/components/atoms/List'
import { Avatar, Card, Dropdown, Form, Statistic, message } from 'antd'
import { useAppSelector } from '~/store'
import { DATE, SUCCESS } from '~/utils/constant'
import { deletePostComment, setCommentPost, updateActionPost } from '~/api/post'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { Authorization } from '~/wrapper/Authorization'
import { TextArea } from '~/components/atoms/Input'
import {
  LikeOutlined,
  MessageOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  LikeTwoTone,
  DislikeTwoTone
} from '@ant-design/icons';
import { checkForbiddenWord, encryptionUserName } from '~/utils/helper'


import Meta from 'antd/es/card/Meta'
import defaultUser from '~/assets/images/defaultUser.png'
import menuIcon from '~/assets/images/menuIcon.svg'

import loadable from '~/utils/loadable'
import styles from './styles.module.scss'
import ImageList from '../ImageList'

const Svg = loadable(() => import("~/components/atoms/Svg"));
const ModalEditComment = loadable(() => import("~/components/atoms/ModalEditComment"));
const ModalPost = loadable(() => import("~/components/molecules/PostList/PostModal"));
interface Props {
  dataPosts?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
  maxHeight?: string;
}

const PostList = (props: Props) => {
  const { dataPosts, isFetching, isLoading, refetch, maxHeight } = props;

  const userData = useAppSelector((state) => state.userInfo.userData);
  const fWords = useAppSelector((state) => state.fwordList.fwordList);

  const [showCommentMap, setShowCommentMap] = useState<any>({})
  const [postId, setPostId] = useState('')
  const [isLoadingComment, setIsLoadingComment] = useState(false)
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any>([]);
  const [itemEditComment, setItemEditComment] = useState<any>({});
  const [visibleModalEditComment, setVisibleModalEditComment] = useState(false);

  const [visibleModalEditPost, setVisibleModalEditPost] = useState(false);
  const [postEditing, setPostEditing] = useState({});

  useEffect(() => {
    if (dataPosts) {
      setDataSource(dataPosts)
    }
  }, [dataPosts])

  const handleShowComment = (itemId: string) => {
    setShowCommentMap({
      // ...showCommentMap,
      [itemId]: !showCommentMap[itemId]
    })
    form.resetFields()
    setIsLoadingComment(true)

    setTimeout(() => {
      setIsLoadingComment(false)
    }, 1000)
  }

  const handleLike_Dislike = async (itemId: string, action: string) => {
    const postIndex = dataSource.findIndex((item: any) => item._id === itemId);
    if (postIndex === -1) return;
    const post = dataSource[postIndex];
    let newLike = post.like?.length;
    let newDislike = post.dislike?.length;
    let updatedLike = post.like ? [...post.like] : [];
    let updatedDislike = post.dislike ? [...post.dislike] : [];
    const userLiked = updatedLike.find(
      (item: any) => item.user === userData?._id
    );
    const userDisliked = updatedDislike.find(
      (item: any) => item.user === userData?._id
    );

    if (action === "like") {
      if (!userLiked && !userDisliked) {
        newLike += 1;
        updatedLike.push({ user: userData?._id });
      } else if (userLiked) {
        newLike -= 1;
        const userIndex = updatedLike.findIndex(
          (item: any) => item.user === userData?._id
        );
        updatedLike.splice(userIndex, 1);
      } else if (!userLiked && userDisliked) {
        newLike += 1;
        newDislike -= 1;
        const userIndex = updatedDislike.findIndex(
          (item: any) => item.user === userData?._id
        );
        updatedDislike.splice(userIndex, 1);
        updatedLike.push({ user: userData?._id });
      }
    } else {
      if (!userLiked && !userDisliked) {
        newDislike += 1;
        updatedDislike.push({ user: userData?._id });
      } else if (userDisliked) {
        newDislike -= 1;
        const userIndex = updatedDislike.findIndex(
          (item: any) => item.user === userData?._id
        );
        updatedDislike.splice(userIndex, 1);
      } else if (userLiked && !userDisliked) {
        newLike -= 1;
        newDislike += 1;
        const userIndex = updatedLike.findIndex(
          (item: any) => item.user === userData?._id
        );
        updatedLike.splice(userIndex, 1);
        updatedDislike.push({ user: userData?._id });
      }
    }

    const updatedPost = {
      ...post,
      likeCount: newLike,
      dislikeCount: newDislike,
      like: updatedLike.length > 0 ? updatedLike : undefined,
      dislike: updatedDislike.length > 0 ? updatedDislike : undefined,
    };

    const newDataSourse = [...dataSource];
    newDataSourse[postIndex] = updatedPost;
    setDataSource(newDataSourse);

    const res = await updateActionPost(itemId, action)

    if (res.msg === SUCCESS) {
      const updatedData = [...dataSource];
      updatedData[postIndex] = res?.posts;
      setDataSource(updatedData)
    }
  };

  const handleKeyPress = (event: any, postId: string) => {
    setPostId(postId)
    if (event.key === "Enter") {
      form.submit();
    }
  }

  const handleComment = async (formValues: any) => {
    const res = await setCommentPost(postId, formValues);
    if (res.msg === SUCCESS) {
      message.success('Comment success')
      refetch()
      form.resetFields()
    } else {
      message.error(res.msg)
    }
  }

  const handleEditComment = (postId: string, comment: any) => {
    setItemEditComment({
      postId,
      comment: comment
    })
    setVisibleModalEditComment(true)
  }

  const handleDeleteComment = async (postId: string, commentId: string) => {
    const res = await deletePostComment(postId, commentId);
    if (res.msg === SUCCESS) {
      message.success('Delete comment succes')
      refetch();
    } else {
      message.error(res.msg)
    }
  }
  const handleEditPost = (post: any) => {
    setVisibleModalEditPost(true)
    setPostEditing(post)
  }
  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        className={styles.listContainer}
        itemLayout="vertical"
        size="small"
        style={{ maxHeight: maxHeight }}
        dataSource={dataSource}
        renderItem={(item: any) => (
          <div key={item._id}>
            <Card
              style={{marginBottom: '1rem'}}
              headStyle={{ border: 'none' }}
              className='bg-bgColor'
              actions={[
                <Statistic
                  value={item?.like?.length}
                  prefix={
                    item.like?.find((e: any) => e.user === userData?._id) ?
                      <LikeTwoTone
                        onClick={() => handleLike_Dislike(item._id, 'like')} />
                      :
                      <LikeOutlined
                        onClick={() => handleLike_Dislike(item._id, 'like')}
                      />
                  }
                  valueStyle={{ fontSize: '16px' }}
                />,
                <Statistic
                  value={item.dislike?.length}
                  prefix={
                    item.dislike?.find((e: any) => e.user === userData?._id) ?
                      <DislikeTwoTone
                        onClick={() => handleLike_Dislike(item._id, 'dislike')}
                      />
                      :
                      <DislikeOutlined
                        onClick={() => handleLike_Dislike(item._id, 'dislike')}
                      />
                  }
                  valueStyle={{ fontSize: '16px' }}
                />,
                <Statistic
                  value={item?.comments?.length}
                  valueStyle={{ fontSize: '16px' }}
                  prefix={
                    <MessageOutlined
                      onClick={() => handleShowComment(item._id)}
                    />
                  }
                />
              ]}
              extra={
                <div>
                  { item?.updatedBy?._id === userData?._id ?
                    <Svg className='w-6' src={menuIcon} onClick={() => handleEditPost(item)}/>
                    : null
                  }

                </div>
              }
            >
              <Meta
                avatar={ item?.inGroup ?
                  <Avatar.Group>
                    <Avatar shape='square' size={42} src={item?.inGroup?.avatar} />
                    <Avatar size={27} src={item?.updatedBy?.avatar} />
                  </Avatar.Group>
                  :
                  <Avatar size={42} src={item?.updatedBy?.avatar} />
                }
                title={ item?.inGroup ? 
                  <Link
                    to={`/group/${item.inGroup?._id}`}
                  >
                    {item?.inGroup?.name}
                  </Link>
                  :
                  <Link
                    to={`/profile/${item.updatedBy?._id}`}
                  >
                    { 
                      encryptionUserName(item?.updatedBy?.username)
                    }
                  </Link>
                }
                description={(
                  item?.inGroup ? 
                  <div>
                    <Link
                      to={`/profile/${item.updatedBy?._id}`}
                    >
                      {encryptionUserName(item?.updatedBy?.username)}
                    </Link>
                    &nbsp; • &nbsp;
                    {format(new Date(item.createdAt), DATE)}
                  </div>
                  :
                  <Link
                    to={`/posts/${item._id}`}
                  >
                    {format(new Date(item.createdAt), DATE)}
                  </Link>
                )}
              />
              <div className={styles.postContent}>
                {checkForbiddenWord(item.description, fWords)}
                <ImageList imageList={item.image}/>
              </div>
            </Card>
            {showCommentMap[item._id] &&
              <Spin spinning={isLoadingComment}>
                <div className={styles.commentContainer}>
                  {item?.comments?.map((comment: any) =>
                    <div
                      key={comment._id}
                      className={styles.comment}
                    >
                      <Meta
                        key={comment._id}
                        avatar={
                        <>
                          <Avatar style={{marginRight: '0.5rem'}} src={comment?.createdBy?.avatar?.url || comment?.updatedBy?.avatar?.url || defaultUser} />
                          <strong>
                            {comment.createdBy?.firstName} {comment.createdBy?.lastName} 
                          </strong>
                        </>
                          }
                        description={<p className={styles.commentContent}>{comment.content}</p>}
                      />
                      {(comment.createdBy === userData?._id) ?
                        <Dropdown
                          menu={
                            {
                              items: [
                                {
                                  label: <div onClick={() => handleEditComment(item._id, comment)}>Edit comment</div>,
                                  key: '0',
                                },
                                {
                                  type: 'divider',
                                },
                                {
                                  label: <div onClick={() => handleDeleteComment(item._id, comment._id)}>Delete comment</div>,
                                  key: '2',
                                  danger: true,
                                },
                              ]
                            }
                          }
                          trigger={['click']}
                        >
                          <div
                            className={styles.commentOption}
                          >
                            <Svg src={menuIcon} className='w-5' />
                          </div>
                        </Dropdown>
                        : null
                      }
                    </div>
                  )
                  }
                  <div className={styles.commentArea}>
                    <Form
                      form={form}
                      layout='vertical'
                      onFinish={handleComment}
                      key={item._id}
                    >
                      <Form.Item
                        name='content'
                      >
                        <TextArea
                          className='mt-2'
                          placeholder='Enter your comment'
                          onKeyPress={(e: any) => handleKeyPress(e, item._id)}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Spin>
            }
          </div>
        )}
      />
      <ModalEditComment
        visible={visibleModalEditComment}
        setVisivle={setVisibleModalEditComment}
        postId={itemEditComment?.postId}
        comment={itemEditComment?.comment}
        refetch={refetch}
      />
      <ModalPost
        postData={postEditing}
        visible={visibleModalEditPost}
        setVisible={setVisibleModalEditPost}
        afterSuccess={refetch}
      />
    </Spin>
  )
}

export default PostList