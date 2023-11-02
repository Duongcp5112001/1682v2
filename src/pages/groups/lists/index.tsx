import React from 'react'
import GroupList from '~/components/molecules/GroupList'

const Group = () => {
  return (
    <div className='overflow-y-scroll overflow-x-hidden max-h-[90vh]'>
      <GroupList/>
    </div>
  )
}

export default Group