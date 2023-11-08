import React from 'react'
import { Avatar, Divider, Dropdown, Input, List, message } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useAccountList } from '~/hooks/useAccount'
import { ROUTES } from '~/routes'
import { AllStatus, DATE, SUCCESS } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import Spin from '~/components/atoms/Spin'
import Status from '~/components/atoms/Status'
import { activeMember, inactiveMember } from '~/api/admin'

const { Search } = Input;
const Accounts = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading, refetch} = useAccountList(token)
  const dataAccounts = data?.data;

  const handleActiveAccount = async (accountId: any) => {
    try {
      const res = await activeMember(accountId)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Active account success')
          refetch()
        } else {
          message.error('Active account fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInactiveAccount = async (accountId: any) => {
    try {
      const res = await inactiveMember(accountId)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Inactive account success')
          refetch()
        } else {
          message.error('Inactive account fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
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
                title={
                  <div className='flex'>
                    <Link to={ROUTES.MemberProfile(item?._id)}>
                      {item?.username}
                    </Link>
                    <Status status={item?.status}/>
                  </div>
                }
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