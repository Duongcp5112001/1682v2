import React, { useEffect, useState } from 'react'
import { Avatar, Card, Dropdown, Form, Statistic, message } from 'antd'
import {
  LikeOutlined,
  MessageOutlined,
  DislikeOutlined,
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
import { deletePost, deletePostComment, setCommentPost, updateActionPost } from '~/api/post';
import { usePostDetail } from '~/hooks/usePost';

import defaultUser from '~/assets/images/defaultUser.png'
import styles from './styles.module.scss'
import { checkForbiddenWord, encryptionUserName } from '~/utils/helper';
import ImageList from '../PostList/ImageList';
import ModalPost from '../PostList/PostModal';
import ModalConfirm from '~/components/atoms/ModalConfirm';
import Svg from '~/components/atoms/Svg';
import menuIcon from '~/assets/images/menuIcon.svg'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/routes';

const Spin = loadable(() => import("~/components/atoms/Spin"));
const ModalEditComment = loadable(() => import("~/components/atoms/ModalEditComment"));

interface Props {
  postId: any;
}

const PostDetail = (props: Props) => {
  const { postId } = props;


  const {data, isLoading, isFetching, refetch} = usePostDetail(postId)
  const dataPosts = data?.posts;

  const userData = useAppSelector((state) => state.userInfo.userData);
  const fWords = useAppSelector((state) => state.fwordList.fwordList);

  const [showCommentMap, setShowCommentMap] = useState<any>({})
  const [isLoadingComment, setIsLoadingComment] = useState(false)
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any>([]);
  const [itemEditComment, setItemEditComment] = useState<any>({});
  const [visibleModalEditComment, setVisibleModalEditComment] = useState(false);
  const [visibleModalEditPost, setVisibleModalEditPost] = useState(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
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
    const post = dataSource;
    let newLike = post.likeCount;
    let newDislike = post.dislikeCount;
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

    setDataSource(updatedPost);

    const res = await updateActionPost(itemId, action)
    if (res.msg === SUCCESS) {
      setDataSource(res?.posts)
    }
  };

  const handleKeyPress = (event: any) => {
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

  const handleEditComment = (postId: string, commentId: string) => {
    setItemEditComment({
      postId,
      commentId
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

  const handleEditPost = () => {
    setVisibleModalEditPost(true)
  }

  const handleDeletePost = async () => {
    try {
      const res = await deletePost(postId)
      if (res) {
        if (res.msg === 'Delete posts Success!') {
          message.success(res.msg)
          setVisibleModalDelete(false)
          navigate(ROUTES.Posts)
        } else {
          message.error(res.msg)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const showDeleteModal = () => {
    setVisibleModalDelete(true)
  }

  return (
    <Spin spinning={isLoading || isFetching}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.infoContainer}>
            <div>
            <Card
              className='mt-2'
              headStyle={{ border: 'none' }}
              actions={[
                <Statistic
                  value={dataSource?.like?.length}
                  prefix={
                    dataSource?.like?.find((e: any) => e.user === userData?._id) ?
                      <LikeTwoTone
                        onClick={() => handleLike_Dislike(dataSource._id, 'like')} />
                      :
                      <LikeOutlined
                        onClick={() => handleLike_Dislike(dataSource._id, 'like')}
                      />
                  }
                  valueStyle={{ fontSize: '16px' }}
                />,
                <Statistic
                  value={dataSource?.dislike?.length}
                  prefix={
                    dataSource?.dislike?.find((e: any) => e.user === userData?._id) ?
                      <DislikeTwoTone
                        onClick={() => handleLike_Dislike(dataSource._id, 'dislike')}
                      />
                      :
                      <DislikeOutlined
                        onClick={() => handleLike_Dislike(dataSource._id, 'dislike')}
                      />
                  }
                  valueStyle={{ fontSize: '16px' }}
                />,
                <Statistic
                  value={dataSource?.comments?.length}
                  valueStyle={{ fontSize: '16px' }}
                  prefix={
                    <MessageOutlined
                      onClick={() => handleShowComment(dataSource._id)}
                    />
                  }
                />
              ]}
              extra={
                <div>
                  { dataSource?.updatedBy?._id === userData?._id ?
                    <Dropdown
                      menu={
                        {
                          items: [
                            {
                              label: <div onClick={() => handleEditPost()}>Edit</div>,
                              key: '0',
                            },
                            {
                              label: <div onClick={() => showDeleteModal()}>Delete</div>,
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
                        <Svg src={menuIcon} className='w-6' />
                      </div>
                    </Dropdown>
                    : null
                  }

                </div>
              }
            >
              <Meta
                avatar={<Avatar size={42} src={dataSource?.updatedBy?.avatar} />}
                title={
                  <div>{encryptionUserName(dataSource?.updatedBy?.username)}</div>
                }
                description={(
                  <div>
                    { dataSource?.updatedAt && format(new Date(dataSource.updatedAt), DATE)}
                  </div>
                )}
              />
              <div className={styles.postContent}>
                {checkForbiddenWord(dataSource.description, fWords)}
                <ImageList imageList={dataSource.image}/>
              </div>
            </Card>
            {showCommentMap[dataSource._id] &&
              <Spin spinning={isLoadingComment}>
                <div className={styles.commentContainer}>
                  {dataSource?.comments?.map((comment: any) =>
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
                        description={
                          <p className={styles.commentContent}>
                            {checkForbiddenWord(comment.content, fWords)}
                          </p>
                        }
                      />
                      {(comment.updatedBy === userData?._id) ?
                        <Dropdown
                          menu={
                            {
                              items: [
                                {
                                  label: <div onClick={() => handleEditComment(dataSource._id, comment._id)}>Edit comment</div>,
                                  key: '0',
                                },
                                {
                                  type: 'divider',
                                },
                                {
                                  label: <div onClick={() => handleDeleteComment(dataSource._id, comment._id)}>Delete comment</div>,
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
                            <EllipsisOutlined />
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
                    >
                      <Form.Item
                        name='content'
                      >
                        <TextArea
                          className='mt-2'
                          placeholder='Enter your comment'
                          onKeyPress={(e: any) => handleKeyPress(e)}
                        />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Spin>
            }
          </div>
        </div>
      </div>
    </div>
      <ModalEditComment
        visible={visibleModalEditComment}
        setVisivle={setVisibleModalEditComment}
        postId={itemEditComment?.postId}
        commentId={itemEditComment?.commentId}
        refetch={refetch}
      />
      <ModalPost
        postData={dataPosts}
        visible={visibleModalEditPost}
        setVisible={setVisibleModalEditPost}
        afterSuccess={refetch}
      />
      <ModalConfirm
        onCancel={() => setVisibleModalDelete(false)}
        onOk={handleDeletePost}
        visible={visibleModalDelete}
        title='Are you sure to delete this post!'
        centered={true}
      />
    </Spin>
  )
}




export default PostDetail