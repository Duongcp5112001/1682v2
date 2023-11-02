import React from 'react';
import { Card, message } from 'antd';
import { joinGroup, unjoinGroup } from '~/api/groups';
import { SUCCESS } from '~/utils/constant';
import { useAppSelector } from '~/store';

import styles from './styles.module.scss';
interface Props {
  group?: any;
  joined?: boolean;
  refetch: () => void;
  myGroup?: boolean;
}

const GroupCard = (props: Props) => {
  const { group, refetch, joined, myGroup } = props;
  const userData = useAppSelector((state) => state.userInfo.userData);

  const handleJoinGroup = async () => {
    try {
      const res = await joinGroup(group?._id, userData?._id)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Join group success')
          refetch()
        } else {
          message.error('Join group fail!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnjoinGroup = async () => {
    try {
      const res = await unjoinGroup(group?._id, userData?._id)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Unjoin group success')
          refetch()
        } else {
          message.error('Unjoin group fail!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteGroup = async () => {
    // Todo
  }

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
        { !joined && !myGroup ? 
          <button onClick={handleJoinGroup} className='mb-2 w-100 rounded-md px-2 py-1 bg-btnPrimary text-white hover:bg-sky-600'>Join Group</button>
          :
          myGroup ?
          <button onClick={handleDeleteGroup} className='mb-2 w-100 rounded-md px-2 py-1 bg-btnSecondary text-white hover:bg-gray-500'>Delete Group</button>
          :
          <button onClick={handleUnjoinGroup} className='mb-2 w-100 rounded-md px-2 py-1 bg-btnSecondary text-white hover:bg-gray-500'>Leave Group</button>
        }
      </div>
    </Card>
  )
}

export default GroupCard