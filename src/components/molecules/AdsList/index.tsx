import React, { useMemo } from 'react'
import { Carousel } from 'antd'
import { useAdsList } from '~/hooks/useAds'
import { getCookie } from '~/utils/cookie'

import loadable from '~/utils/loadable'
import { adsClick } from '~/api/ads'
import { AllStatus } from '~/utils/constant'

const Spin = loadable(() => import("~/components/atoms/Spin"));


const AdsList = () => {
  const token = getCookie('token')
  const { data, isLoading, isFetching } = useAdsList(token)
  const adsData = data?.data

  const showingAds = useMemo(() => {
    return adsData?.filter((ads: any) => ads?.status === AllStatus.ACTIVE);
  }, [adsData])

  // Count ads click => dashboard

  const handleClickAds = async (adsId: any) => {
    try {
      const res = await adsClick(adsId)
      if (res) {
        console.log(res)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Spin spinning={isLoading || isFetching}>
      <Carousel autoplay>
        { showingAds?.map((item: any) => 
          <div key={item?._id} className='px-2' onClick={()=> handleClickAds(item?._id)}>
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