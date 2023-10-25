import { List } from 'antd'
import React from 'react'
import { useFriends } from '~/hooks/useFriends'
import { getCookie } from '~/utils/cookie'
import FriendCard from './FriendCard'

const Friends = () => {
  const token = getCookie('token')

  const {data, isLoading, isFetching} = useFriends(token)
  const friends = data?.data?.member?.friends || [];

  console.log(friends)
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={friends}
      renderItem={(item: any) => (
        <List.Item key={item?._id}>
          <FriendCard friendData={item}/>
        </List.Item>
      )}
    />
  )
}

export default Friends