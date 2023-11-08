import React, { useState } from 'react';
import { Button, Card, Dropdown, message } from 'antd';
import { AllStatus, SUCCESS } from '~/utils/constant';
import { useAppSelector } from '~/store';

import styles from './styles.module.scss';
import Svg from '~/components/atoms/Svg';
import menuIconWhite from '~/assets/images/menuIconWhite.svg';
import dotGreen from '~/assets/images/dotGreen.svg';
import dotOrange from '~/assets/images/dotOrange.svg';
import TailwindButton from '~/components/atoms/TailwindButton';
import { activeGroup, inactiveGroup } from '~/api/admin';
import Status from '~/components/atoms/Status';

interface Props {
  group?: any;
  joined?: boolean;
  refetch: () => void;
}

const GroupCard = (props: Props) => {
  const { group, refetch, joined } = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleActiveGroup = async () => {
    try {
      const res = await activeGroup(group?._id)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Active group success')
          refetch()
        } else {
          message.error('Active group fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInactiveGroup = async () => {
    try {
      const res = await inactiveGroup(group?._id)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Inactive group success')
          refetch()
        } else {
          message.error('Inactive group fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const handleShowModalConfirm = () => {
  //   setVisibleModalConfirm(true)
  // } 
  // const handleCloseModalConfirm = (e: any) => {
  //   e.stopPropagation();
  //   setVisibleModalConfirm(false)
  // }


  return (
    <>
      <Card
        hoverable
        className={styles.cardContainer}
        style={{ width: 340 }}
        cover={<img alt={group?.name} src={group?.coverImage} />}
      >
        <div className='flex justify-between'>
          <div>
            <div className='text-base font-medium mb-1 flex'>
              {group?.name}
              <Status status={group?.status}/>
            </div>
            <div className='mb-2'>
              {group?.members?.length} member
            </div>
          </div>
          <div className='flex items-center'>
            <Dropdown
              menu={
                {
                  items: [
                    (group?.status && group.status === AllStatus.INACTIVE) && {
                      label: <div onClick={() => handleActiveGroup()}>Active group</div>,
                      key: '0',
                    },
                    (group?.status && group.status === AllStatus.ACTIVE) && {
                      label: <div onClick={() => handleInactiveGroup()}>Inactive group</div>,
                      key: '2',
                      danger: true,
                    },
                  ]
                }
              }
              trigger={['click']}
            >
              <div
                className='cursor-pointer'
              >
                <TailwindButton
                  type='secondary'
                >
                  <Svg src={menuIconWhite} className='w-5' />
                </TailwindButton>
              </div>
            </Dropdown>
          </div>
        </div>
      </Card>
      {/* <ModalConfirm
        visible={visibleModalConfirm}
        onCancel={(e) => handleCloseModalConfirm(e)}
        onOk={handleDeleteGroup}
        centered={true}
        title={`Are you sure to delete ${group?.name}`}
      >
        <div className='ml-9'>
          This operation cannot be undone!
        </div>
      </ModalConfirm> */}
    </>
  )
}

export default GroupCard