import React, { useState } from 'react'
import LoadingButton from '~/components/atoms/LoadingButton'
import TailwindButton from '~/components/atoms/TailwindButton'

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div>
      { loading ? 
        <LoadingButton/>
        :
        <TailwindButton className='bg-btnAntd' onClick={() => setLoading(true)}>Test Loading</TailwindButton>
      }
    </div>
  )
}

export default ResetPassword