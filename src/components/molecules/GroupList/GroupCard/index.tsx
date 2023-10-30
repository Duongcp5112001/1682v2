import { Card } from 'antd'
import React from 'react';
import styles from './styles.module.scss'

interface Props {
  group?: any;
}

const GroupCard = (props: Props) => {
  const { group } = props;
  return (
    <Card
      hoverable
      className={styles.cardContainer}
      style={{ width: 340 }}
      cover={<img alt={group?.name} src={group?.coverImage} />}
    >
      <div className='text-base font-medium mb-1'>
        {group?.name}
      </div>
      <div className='mb-2'>
        {group?.members?.length} member
      </div>
      <div className='flex flex-col justify-center items-center'>
        <button className='mb-2 w-100 rounded-md px-2 py-1 bg-btnPrimary text-white hover:bg-sky-600'>Join Group</button>
      </div>
    </Card>
  )
}

export default GroupCard