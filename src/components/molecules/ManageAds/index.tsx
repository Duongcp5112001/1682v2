import React from 'react'
import { Avatar, Divider, Dropdown, Input, List } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ROUTES } from '~/routes'
import { AllStatus, DATE } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import clickIcon from '~/assets/images/clickIcon.svg'
import { useGroups } from '~/hooks/useGroup'
import { useAdsList } from '~/hooks/useAds'
import Spin from '~/components/atoms/Spin'

const { Search } = Input;
const ManageAds = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading} = useAdsList(token)
  const dataAds = data?.data;
  const handleActiveAds = async (adsId: any) => {
    //Todo
  }

  const handleInactiveAds = async (groupId: any) => {
    //Todo
  }
  return (
    <>
      <div className='flex justify-between'>
        <h3 className='text-2xl'>Manage groups</h3>
        <Search 
          className="w-[500px] border-primary" 
          placeholder="Enter account name"
        />
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
                  <div className='flex mr-5'>
                    <Svg src={clickIcon} className='w-5'/>
                    {100}
                  </div>
                  <Dropdown
                    menu={
                      {
                        items: [
                          (item?.status && item.status === AllStatus.INACTIVE) && {
                            label: <div onClick={() => handleActiveAds(item._id)}>Active ad</div>,
                            key: '0',
                          },
                          {
                            type: 'divider',
                          },
                          (item?.status && item.status === AllStatus.ACTIVE) && {
                            label: <div onClick={() => handleInactiveAds(item._id)}>Inactive ad</div>,
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
                title={<div>{item?.company}</div>}
                description={item?.createdAt && ` ${format(new Date(item.createdAt), DATE)}`}
              />
              {item?.title}
            </List.Item>
          )}
        />
      </Spin>
    </>
  )
}

export default ManageAds