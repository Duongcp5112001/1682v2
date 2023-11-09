import React from 'react'
import { useParams } from 'react-router-dom';
import Profile from '~/components/molecules/Profile'

const MemberProfile = () => {
  const { id } = useParams();
  return (
    <div className='overflow-y-scroll max-h-[90vh]'>
      <Profile id={id}/>
    </div>
  )
}

export default MemberProfile