import { Avatar, Button, Card, Space } from 'antd'
import React, { useState } from 'react'
import defaultAvatar from '~/assets/images/defaultUser.png'
import styles from './styles.module.scss'
import ModalPost from '../PostList/PostModal'

interface Props {
  afterSuccess?: () => void;
}

const CreatePost = (props: Props) => {
  const {afterSuccess} = props;
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
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        afterSuccess={afterSuccess}
      />
    </>
  )
}

export default CreatePost