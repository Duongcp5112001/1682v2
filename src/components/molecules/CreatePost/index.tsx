import React, { useState } from 'react'
import { Avatar, Button, Card } from 'antd'
import defaultAvatar from '~/assets/images/defaultUser.png'
import loadable from '~/utils/loadable'

import styles from './styles.module.scss'

const ModalPost = loadable(() => import("~/components/molecules/PostList/PostModal"));

interface Props {
  afterSuccess?: () => void;
  groupId?: any;
}

const CreatePost = (props: Props) => {
  const {afterSuccess, groupId} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Card className={styles.createPostContainer}>
        <div className={styles.cardContent}>
          <Avatar className={styles.avatar} src={defaultAvatar}/>
          <Button onClick={() => setIsModalVisible(true)} className={styles.btn} size='large'>What's in your mind?</Button>
        </div>
      </Card>
      <ModalPost
        groupId={groupId}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        afterSuccess={afterSuccess}
      />
    </>
  )
}

export default CreatePost