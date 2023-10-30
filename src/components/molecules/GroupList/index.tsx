import React from 'react'
import Spin from '~/components/atoms/Spin';
import { useGroups } from '~/hooks/useGroup';
import { getCookie } from '~/utils/cookie';
import { Avatar, List } from 'antd';
import GroupCard from './GroupCard';

const GroupList = () => {
  const token = getCookie('token')
  const {data, isLoading, isFetching} = useGroups(token)
  const dataGroups = data?.data
  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={dataGroups}
        renderItem={(item: any) => (
          <List.Item
            key={item?._id}
          >
            <GroupCard group={item}/>
          </List.Item>
        )}
      />
    </Spin>
  )
}

export default GroupList