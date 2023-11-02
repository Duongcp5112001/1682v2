import React from 'react'
import { List, Spin } from 'antd'
import { useFriends } from '~/hooks/useFriends'
import { getCookie } from '~/utils/cookie'
import loadable from '~/utils/loadable'

const FriendCard = loadable(() => import("~/components/molecules/Friends/FriendCard"));

const Friends = () => {
  const token = getCookie('token')

  const {data, isLoading, isFetching, refetch} = useFriends(token)
  const friends = data?.data?.member?.friends || [];

  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={friends}
        renderItem={(item: any) => (
          <List.Item key={item?._id}>
            <FriendCard refetch={refetch} friendData={item}/>
          </List.Item>
        )}
      />
    </Spin>
  )
}

export default Friends