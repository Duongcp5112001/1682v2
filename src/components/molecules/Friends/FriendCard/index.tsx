import { Button, Card } from 'antd'
import React from 'react'
import styles from './styles.module.scss'
const { Meta } = Card;

interface Props {
  friendData: any;
}

const FriendCard = (props: Props) => {
  const {friendData} = props;

  const friends = friendData?.friendId
  return (
    <Card
      hoverable
      className={styles.cardContainer}
      style={{ width: 240 }}
      cover={<img alt={friends?.username} src={friends?.avatar} />}
    >
      <div className='text-base font-medium mb-2'>
        {`User-${friends?._id.slice(-6)}`}
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button className='mb-2 w-[150px] rounded-md px-2 py-1 bg-btnPrimary text-white hover:bg-sky-600'>Accept</button>
        <button className='mb-2 w-[150px] rounded-md px-2 py-1 bg-btnSecondary text-white hover:bg-gray-500'>Delete</button>
      </div>
    </Card>
  )
}

export default FriendCard