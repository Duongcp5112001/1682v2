import React from 'react'
import { Carousel } from 'antd'

import { useAdsList } from '~/hooks/useAds'
import { getCookie } from '~/utils/cookie'
import Spin from '~/components/atoms/Spin'
import { Link } from 'react-router-dom'
import { ROUTES } from '~/routes'

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
        
        {/* Contact with admin for ads slot */}
        {/* <Link to={ROUTES.Contact}>
          <div className='flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-[350px]'>
            <div className='text-white text-2xl font-semibold text-center'>
              Click here <br /> to place an ad
            </div>
          </div>
        </Link> */}
      </Carousel>
    </Spin>
        
  )
}

export default AdsList