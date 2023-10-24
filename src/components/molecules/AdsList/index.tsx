import { Carousel } from 'antd'
import React from 'react'
import Svg from '~/components/atoms/Svg'
import ads1 from '~/assets/images/ads1.jpg'
import ads2 from '~/assets/images/ads2.jpg'
import { useAdsList } from '~/hooks/useAds'
import { getCookie } from '~/utils/cookie'

const AdsList = () => {
  const token = getCookie('token')
  const {data, isLoading, isFetching } = useAdsList(token)
  const adsData = data?.data
  return (
    <Carousel autoplay>
      { adsData?.map((item: any) => 
        <div key={item?._id} className='px-2'>
          <img className='object-contain' src={item?.img} alt={item?.title} />
        </div>
      )
      }
    </Carousel>
        
  )
}

export default AdsList