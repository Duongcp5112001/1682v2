import React from 'react'
import { Carousel } from 'antd'

import { useAdsList } from '~/hooks/useAds'
import { getCookie } from '~/utils/cookie'
import Spin from '~/components/atoms/Spin'

const AdsList = () => {
  const token = getCookie('token')
  const { data, isLoading, isFetching } = useAdsList(token)
  const adsData = data?.data
  // Count ads click => dashboard
  return (
    <Spin spinning={isLoading || isFetching}>
      <Carousel autoplay>
        { adsData?.map((item: any) => 
          <div key={item?._id} className='px-2'>
            <a href={item?.url} target='_blank'>
              <img className='object-contain' src={item?.img} alt={item?.title} />
            </a>
          </div>
        )
        }
      </Carousel>
    </Spin>
        
  )
}

export default AdsList