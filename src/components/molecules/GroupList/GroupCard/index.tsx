import React, { useState } from 'react';
import { Card, message } from 'antd';
import { deleteGroup, joinGroup, unjoinGroup } from '~/api/groups';
import { SUCCESS } from '~/utils/constant';
import { useAppSelector } from '~/store';

import styles from './styles.module.scss';
import ModalConfirm from '~/components/atoms/ModalConfirm';
import Spin from '~/components/atoms/Spin';
import TailwindButton from '~/components/atoms/TailwindButton';
import { checkForbiddenWord } from '~/utils/helper';
interface Props {
  group?: any;
  joined?: boolean;
  refetch: () => void;
  myGroup?: boolean;
}

const GroupCard = (props: Props) => {
  const { group, refetch, joined, myGroup } = props;
  
  const userData = useAppSelector((state) => state.userInfo.userData);
  const fWords = useAppSelector((state) => state.fwordList.fwordList);

  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleJoinGroup = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  const handleUnjoinGroup = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  const handleDeleteGroup = async () => {
    setLoading(true)
    try {
      const res = await deleteGroup(group?._id)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Unjoin group success')
          setVisibleModalConfirm(false)
          refetch()
        } else {
          message.error('Unjoin group fail!')
        }
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleShowModalConfirm = () => {
    setVisibleModalConfirm(true)
  } 
  const handleCloseModalConfirm = (e: any) => {
    e.stopPropagation();
    setVisibleModalConfirm(false)
  }

  return (
    <>
      <Card
        hoverable
        className={styles.cardContainer}
        style={{ width: 340 }}
        cover={<img className='h-[140px] object-cover' alt={group?.name} src={group?.coverImage} />}
      >
        <div className='text-base font-medium mb-1'>
          {checkForbiddenWord(group?.name, fWords)}
        </div>
        <div className='mb-2'>
          {group?.members?.length} member
        </div>
        <div className='flex flex-col justify-center items-center'>
          { !joined && !myGroup ? 
            <TailwindButton
              type='primary'
              customClass='w-100'
              onClick={handleJoinGroup}
              loading={loading}
            >
              Join Group
            </TailwindButton>
            :
            myGroup ?
            <TailwindButton
              customClass='w-100'
              loading={loading}
              onClick={(e) => {
                e.stopPropagation();
                handleShowModalConfirm();
              }} 
            >
              Delete Group
            </TailwindButton>
            :
            <TailwindButton
              customClass='w-100'
              type='default'
              loading={loading}
              onClick={(e) => {
                e.stopPropagation();
                handleUnjoinGroup();
              }} 
            >
              Leave Group
            </TailwindButton>
          }
        </div>
      </Card>
      <ModalConfirm
        visible={visibleModalConfirm}
        onCancel={(e) => handleCloseModalConfirm(e)}
        onOk={handleDeleteGroup}
        centered={true}
        title={`Are you sure to delete ${group?.name}`}
      >
        <div className='ml-9'>
          This operation cannot be undone!
        </div>
      </ModalConfirm>
    </>
  )
}

export default GroupCard