import React, { useState } from 'react'
import { Avatar, Divider, Dropdown, Input, List, message } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ROUTES } from '~/routes'
import { AllStatus, DATE, SUCCESS } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import clickIcon from '~/assets/images/clickIcon.svg'
import iconPlusWhite from '~/assets/images/plusIconWhite.svg'
import { useAdsList } from '~/hooks/useAds'
import Spin from '~/components/atoms/Spin'
import TailwindButton from '~/components/atoms/TailwindButton'
import { deleteAds } from '~/api/admin'
import ModalAds from './ModalFword'
import Status from '~/components/atoms/Status'
import ModalFword from './ModalFword'

const { Search } = Input;
const ManageFWords = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading, refetch} = useAdsList(token)
  const dataAds = data?.data;

  const [visibleModalFword, setVisibleModalFword] = useState(false)
  const [editAds, setEditAds] = useState<any>({})

  const handleShowModalFword = () => {
    setVisibleModalFword(true)
  }

  const handleShowModalEditFword = (ads: any) => {
    setEditAds(ads)
    setVisibleModalFword(true)
  }

  const handleDeleteFword =async (adsId: any) => {
    try {
      const res = await deleteAds(adsId)
      if (res) {
        if (res.msg === 'Delete ads success!') {
          message.success('Deltete ad success')
          refetch()
        } else {
          message.error('Deltete ad fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <h3 className='text-2xl'>Manage forbidden word</h3>
        <div className='flex items-center'>
          <Search
            className="w-[500px] border-primary" 
            placeholder="Enter account name"
          />
          <TailwindButton type='primary' customClass='flex items-center ml-3' onClick={handleShowModalFword}>
            <Svg src={iconPlusWhite} className='w-3 mr-2'/>
            Add forbidden word
          </TailwindButton>
        </div>
      </div>
      <Spin spinning={isLoading || isFetching}>
        <List
          className='bg-bgColor p-7 rounded-lg overflow-y-auto max-h-[82vh]'
          style={{maxWidth: 'unset'}}
          dataSource={dataAds}
          itemLayout="vertical"
          renderItem={(item: any) => (
            <List.Item 
              key={item?._id}
              extra={
                <div className='flex '>
                  <Dropdown
                    menu={
                      {
                        items: [
                          {
                            label: <div onClick={() => handleShowModalEditFword(item)}>Edit forbidden word</div>,
                            key: '1',
                          },
                          {
                            label: <div onClick={() => handleDeleteFword(item._id)}>Delete forbidden word</div>,
                            key: '2',
                            danger: true,
                          },
                        ]
                      }
                    }
                    trigger={['hover']}
                  >
                    <div
                      className='cursor-pointer'
                    >
                      <Svg src={menuIcon} className='w-5' />
                    </div>
                  </Dropdown>
                </div>
              }
            >
              <List.Item.Meta
                avatar={<Avatar shape='square' size={56} src={item?.img} />}
                title={
                  <div className='flex'>
                    {item?.company}
                  </div>
                }
                description={item?.createdAt && ` ${format(new Date(item.createdAt), DATE)}`}
              />
              {item?.title}
            </List.Item>
          )}
        />
      </Spin>

      <ModalFword
        visible={visibleModalFword}
        setVisible={setVisibleModalFword}
        afterSuccess={refetch}
        fWords={editAds}
        setEditAds={setEditAds}
      />
    </>
  )
}

export default ManageFWords