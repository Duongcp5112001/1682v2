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
import GroupCard from './GroupCard'

const { Search } = Input;
const ManageGroups = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading, refetch} = useGroups(token)
  const dataGroups = data?.data;

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
          grid={{ gutter: 16, column: 3 }}
          dataSource={dataGroups}
          renderItem={(item: any) => (
            <List.Item
              key={item?._id}
            >
              <GroupCard refetch={refetch} group={item}/>
            </List.Item>
          )}
        />
      </Spin>
    </>
  )
}

export default ManageGroups