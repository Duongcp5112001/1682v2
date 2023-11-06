import React from 'react'
import { Avatar, Divider, Dropdown, Input, List } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useAccountList } from '~/hooks/useAccount'
import { ROUTES } from '~/routes'
import { AllStatus, DATE } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import Spin from '~/components/atoms/Spin'

const { Search } = Input;
const Accounts = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading} = useAccountList(token)
  const dataAccounts = data?.data;

  const handleActiveAccount = async (accountId: any) => {
    //Todo
  }

  const handleInactiveAccount = async (accountId: any) => {
    //Todo
  }
  return (
    <>
    
      <div className='flex justify-between'>
        <h3 className='text-2xl'>Manage account</h3>
        <Search 
          className="w-[500px] border-primary" 
          placeholder="Enter account name"
        />
      </div>
      <Spin spinning={isLoading || isFetching}>
        <List
          className='bg-bgColor p-7 rounded-lg overflow-y-auto max-h-[82vh]'
          style={{maxWidth: 'unset'}}
          itemLayout='vertical'
          dataSource={dataAccounts}
          renderItem={(item: any) => (
            <List.Item 
              key={item?._id}
              extra={
                <Dropdown
                  menu={
                    {
                      items: [
                        (item?.status && item.status === AllStatus.INACTIVE) && {
                          label: <div onClick={() => handleActiveAccount(item._id)}>Active account</div>,
                          key: '0',
                        },
                        {
                          type: 'divider',
                        },
                        (item?.status && item.status === AllStatus.ACTIVE) && {
                          label: <div onClick={() => handleInactiveAccount(item._id)}>Inactive account</div>,
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
                avatar={<Avatar size={42} src={item?.avatar} />}
                title={<Link to={ROUTES.MemberProfile(item?._id)}>{item?.username}</Link>}
                description={item?.createdAt && `${format(new Date(item.createdAt), DATE)}`}
              />

            </List.Item>
          )}
        />
      </Spin>
    </>
  )
}

export default Accounts