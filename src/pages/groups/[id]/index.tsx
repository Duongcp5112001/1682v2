import React from 'react'
import { useParams } from 'react-router-dom';
import Group from '~/components/molecules/GroupDetail'

const GroupDetail = () => {
  const { id } = useParams();

  return (
    <div className='overflow-y-scroll'>
      <Group id={id}/>
    </div>
  )
}

export default GroupDetail