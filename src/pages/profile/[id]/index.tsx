import React from 'react'
import { useParams } from 'react-router-dom';
import Profile from '~/components/molecules/Profile'

const MemberProfile = () => {
  const { id } = useParams();
  return (
    <Profile id={id}/>
  )
}

export default MemberProfile