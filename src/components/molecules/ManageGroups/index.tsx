import React, { useMemo, useState } from 'react'
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
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const ManageGroups = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading, refetch} = useGroups(token)
  const dataGroups = data?.data;
  const [filterGroup, setFilterGroup] = useState('')

  const filterData = useMemo(() => {
    if (filterGroup && dataGroups) {
      return dataGroups.filter((item: any) => item.name?.toLowerCase()?.includes(filterGroup.toLowerCase()))
    } else return dataGroups
  }, [dataGroups, filterGroup])

  return (
    <>
    
      <div className='flex justify-between'>
        <h3 className='text-2xl'>Manage groups</h3>
          <Input
            addonAfter={<SearchOutlined />}
            className="w-[500px] border-primary" 
            placeholder="Search group"
            onChange={(e: any) =>  setFilterGroup(e.target.value)}
          />
      </div>
      <Spin spinning={isLoading || isFetching}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={filterData}
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