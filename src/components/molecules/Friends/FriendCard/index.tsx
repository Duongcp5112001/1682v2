import { Button, Card, message } from 'antd'
import React from 'react'
import { encryptionUserName } from '~/utils/helper';
import { unFriend } from '~/api/friend';
import { useAppSelector } from '~/store';
import { SUCCESS } from '~/utils/constant';

import styles from './styles.module.scss'

interface Props {
  friendData: any;
  refetch: () => void;
}

const FriendCard = (props: Props) => {
  const {friendData, refetch} = props;
  const friends = friendData?.friendId
  const userData = useAppSelector((state) => state.userInfo.userData);

  const handleUnfriend = async () => {
    try {
      const res = await unFriend(friends?._id, {memberId: userData?._id})
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Delete friend success')
          refetch()
        } else {
          message.error('Delete friend fail!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card
      hoverable
      className={styles.cardContainer}
      style={{ width: 240 }}
      cover={<img alt={friends?.username} src={friends?.avatar} />}
    >
      <div className='text-base font-medium mb-2'>
        {encryptionUserName(friends?.username)}
      </div>
      <div className='flex flex-col justify-center items-center'>
        {/* <button className='mb-2 w-[150px] rounded-md px-2 py-1 bg-btnPrimary text-white hover:bg-sky-600'>Accept</button> */}
        <button onClick={handleUnfriend} className='mb-2 w-[150px] rounded-md px-2 py-1 bg-btnSecondary text-white hover:bg-gray-500'>Unfriend</button>
      </div>
    </Card>
  )
}

export default FriendCard