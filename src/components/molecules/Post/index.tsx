import React from 'react';
import { Link } from 'react-router-dom';
import { useMemberById } from '~/hooks/useMember';
import {
  LikeOutlined,
} from '@ant-design/icons';
import styles from './styles.module.scss';

interface Props {
  postData: any;
  dataMember?: any;
}

const Post = (props: Props) => {
  const { postData, dataMember} = props;
  const { data: createdBy } = useMemberById({memberId: postData?.updatedBy})
  const lengthLike = postData.like.length;
  const lengthDislike = postData.dislike.length;
  const lengthCmt = postData.comments.length;
  const liked = false;
  const dataCmt = postData.comments;
  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.user}>
          <div className={styles.userInfo}>
            {/* <img src={dataPostsOwner.avatar} alt="" /> */}
            <div className={styles.details}>
              <Link
                to={'/'}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* <span className="name">{dataPostsOwner.username}</span> */}
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
        {/* <PostMenu icon/> */}
        </div>
        <div className="content">
          <p>{postData.description}</p>
          <img src={postData.image} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <LikeOutlined /> : <LikeOutlined />}
            {lengthLike} Likes
          </div>
          <div className="item">
            {liked ? <LikeOutlined /> : <LikeOutlined />}
            {lengthDislike} Dislikes
          </div>
          <div className="item" onClick={() => console.log('Clicked')}>
            <LikeOutlined />
            {lengthCmt} Comments
          </div>
        </div>
        {/* {commentOpen && <Comments dataMember={dataMember} dataCmt={dataCmt}/>} */}
      </div>
    </div>
  )
}

export default Post