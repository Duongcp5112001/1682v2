import React, { useMemo, useState } from 'react'

import { useGroups } from '~/hooks/useGroup';
import { getCookie } from '~/utils/cookie';
import { useAppSelector } from '~/store';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '~/routes';
import { Divider, List } from 'antd';

import loadable from '~/utils/loadable';
import plusIconWhite from '~/assets/images/plusIconWhite.svg'
import Svg from '~/components/atoms/Svg';

import ModalCreateGroup from '~/components/atoms/ModalCreateGroup';

const Spin = loadable(() => import("~/components/atoms/Spin"));
const TailwindButton = loadable(() => import("~/components/atoms/TailwindButton"));
const GroupCard = loadable(() => import("~/components/molecules/GroupList/GroupCard"));

const GroupList = () => {
  const token = getCookie('token')
  const userData = useAppSelector((state) => state.userInfo.userData);
  const navigate = useNavigate();
  const [visibleModalCreateGroup, setVisibleModalCreateGroup] = useState(false)
  const {data, isLoading, isFetching, refetch} = useGroups(token)
  const dataGroups = data?.data
  const joinedGroups = useMemo(() => {
    return dataGroups?.filter((group: any) => group?.members?.some((member: any) => member.memberGroup === userData?._id));
  }, [dataGroups, userData?._id])

  const suggestGroup = useMemo(() => {
    return dataGroups?.filter((group: any) => (!group?.members?.some((member: any) => member.memberGroup === userData?._id) && (group?.updatedBy !== userData?._id)));
  }, [dataGroups, userData?._id])

  const myGroup = useMemo(() => {
    return dataGroups?.filter((group: any) => group?.updatedBy === userData?._id);
  }, [dataGroups, userData?._id])

  const handleNavigate = (groupId: any) => {
    navigate(ROUTES.GroupDetails(groupId))
  }


  return (
    <>
      <Spin spinning={isLoading || isFetching}>
        <div className='flex justify-end'>
          <TailwindButton onClick={() => setVisibleModalCreateGroup(true)} className='flex items-center bg-btnAntd hover:bg-btnHover text-white'>
            <Svg className='w-3 text-white mr-2' src={plusIconWhite}/>
            Create group
          </TailwindButton>
        </div>
        { myGroup?.length > 0 ?
          <>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={myGroup}
              header={<div className='text-xl font-semibold'>Your groups</div>}
              renderItem={(item: any) => (
                <List.Item
                  onClick={() => handleNavigate(item?._id)}
                  key={item?._id}
                >
                  <GroupCard myGroup={true} refetch={refetch} group={item}/>
                </List.Item>
              )}
            />
    
            <Divider/>
          </>
          : null
        }

        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={suggestGroup}
          header={
            <div>
              <p className='text-xl font-semibold'>Suggestions for you</p>
              <p>Groups you may be interested.</p>
            </div>
          }
          renderItem={(item: any) => (
            <List.Item
              key={item?._id}
            >
              <GroupCard refetch={refetch} group={item}/>
            </List.Item>
          )}
        />
        
        <Divider/>

        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={joinedGroups}
          header={<div className='text-xl font-semibold'>Joined group</div>}
          renderItem={(item: any) => (
            <List.Item
              onClick={() => handleNavigate(item?._id)}
              key={item?._id}
            >
              <GroupCard joined={true} refetch={refetch} group={item}/>
            </List.Item>
          )}
        />

      </Spin>
      <ModalCreateGroup
        visible={visibleModalCreateGroup}
        setVisible={setVisibleModalCreateGroup}
        refetch={refetch}
      />
    </>
  )
}

export default GroupList