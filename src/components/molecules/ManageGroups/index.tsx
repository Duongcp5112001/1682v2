import React from 'react'
import { Avatar, Divider, Dropdown, Input, List } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ROUTES } from '~/routes'
import { AllStatus, DATE } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import { useGroups } from '~/hooks/useGroup'
import Spin from '~/components/atoms/Spin'

const { Search } = Input;
const ManageGroups = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading} = useGroups(token)
  const dataGroups = data?.data;

  const handleActiveGroup = async (groupId: any) => {
    //Todo
  }

  const handleInactiveGroup = async (groupId: any) => {
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
          dataSource={dataGroups}
          itemLayout="vertical"
          renderItem={(item: any) => (
            <List.Item 
              key={item?._id}
              extra = {
                <Dropdown
                  menu={
                    {
                      items: [
                        (item?.status && item.status === AllStatus.INACTIVE) && {
                          label: <div onClick={() => handleActiveGroup(item._id)}>Active group</div>,
                          key: '0',
                        },
                        {
                          type: 'divider',
                        },
                        (item?.status && item.status === AllStatus.ACTIVE) && {
                          label: <div onClick={() => handleInactiveGroup(item._id)}>Inactive group</div>,
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
              }
            >
              <List.Item.Meta
                avatar={<Avatar shape='square' size={56} src={item?.avatar} />}
                title={<div>{item?.name}</div>}
                description={item?.createdAt && ` ${format(new Date(item.createdAt), DATE)}`}
              />
            </List.Item>
          )}
        />
      </Spin>
    </>
  )
}

export default ManageGroups