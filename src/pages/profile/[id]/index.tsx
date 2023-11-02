import React from 'react'
import { useParams } from 'react-router-dom';
import Profile from '~/components/molecules/Profile'

const MemberProfile = () => {
  const { id } = useParams();
  return (
    <div className='overflow-y-scroll'>
      <Profile id={id}/>
    </div>
  )
}

export default MemberProfile