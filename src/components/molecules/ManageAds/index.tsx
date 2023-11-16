import React, { useMemo, useState } from 'react'
import { Avatar, Divider, Dropdown, Input, List, message } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ROUTES } from '~/routes'
import { AllStatus, DATE, SUCCESS } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import clickIcon from '~/assets/images/clickIcon.svg'
import iconPlusWhite from '~/assets/images/plusIconWhite.svg'
import { useAdsList } from '~/hooks/useAds'
import Spin from '~/components/atoms/Spin'
import TailwindButton from '~/components/atoms/TailwindButton'
import { activeAd, deleteAds, inactiveAd } from '~/api/admin'
import ModalAds from './ModalCreateAds'
import Status from '~/components/atoms/Status'
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const ManageAds = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading, refetch} = useAdsList(token)
  const dataAds = data?.data;

  const [visibleModalAd, setVisibleModalAd] = useState(false)
  const [editAds, setEditAds] = useState<any>({})
  const [filterAds, setFilterAds] = useState('')

  const filterData = useMemo(() => {
    if (filterAds && dataAds) {
      return dataAds.filter((item: any) => item.title?.toLowerCase()?.includes(filterAds.toLowerCase()) || item.company?.toLowerCase()?.includes(filterAds.toLowerCase()))
    } else return dataAds
  }, [dataAds, filterAds])
  
  const handleActiveAds = async (adsId: any) => {
    try {
      const res = await activeAd(adsId)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Active ad success')
          refetch()
        } else {
          message.error('Active ad fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleInactiveAds = async (adsId: any) => {
    try {
      const res = await inactiveAd(adsId)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Inactive ad success')
          refetch()
        } else {
          message.error('Inactive ad fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowModalCreateAd = () => {
    setVisibleModalAd(true)
  }

  const handleShowModalEditAd = (ads: any) => {
    setEditAds(ads)
    setVisibleModalAd(true)
  }

  const handleDeleteAds =async (adsId: any) => {
    try {
      const res = await deleteAds(adsId)
      if (res) {
        if (res.msg === 'Delete ads success!') {
          message.success('Deltete ad success')
          refetch()
        } else {
          message.error('Deltete ad fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <h3 className='text-2xl'>Manage groups</h3>
        <div className='flex items-center'>
          <Input
            addonAfter={<SearchOutlined />}
            className="w-[500px] border-primary" 
            placeholder="Search forbidden word"
            onChange={(e: any) =>  setFilterAds(e.target.value)}
          />
          <TailwindButton type='primary' customClass='flex items-center ml-3' onClick={handleShowModalCreateAd}>
            <Svg src={iconPlusWhite} className='w-3 mr-2'/>
            Create ad
          </TailwindButton>
        </div>
      </div>
      <Spin spinning={isLoading || isFetching}>
        <List
          className='bg-bgColor p-7 rounded-lg overflow-y-auto max-h-[82vh]'
          style={{maxWidth: 'unset'}}
          dataSource={filterData}
          itemLayout="vertical"
          renderItem={(item: any) => (
            <List.Item 
              key={item?._id}
              extra={
                <div className='flex '>
                  <div className='flex mr-5'>
                    <Svg src={clickIcon} className='w-5'/>
                    {item?.views?.length}
                  </div>
                  <Dropdown
                    menu={
                      {
                        items: [
                          (item?.status && item.status === AllStatus.INACTIVE) && {
                            label: <div onClick={() => handleActiveAds(item._id)}>Active ad</div>,
                            key: '0',
                          },
                          {
                            label: <div onClick={() => handleShowModalEditAd(item)}>Edit ad</div>,
                            key: '1',
                          },
                          (item?.status && item.status === AllStatus.ACTIVE) && {
                            label: <div onClick={() => handleInactiveAds(item._id)}>Inactive ad</div>,
                            key: '2',
                            danger: true,
                          },
                          {
                            label: <div onClick={() => handleDeleteAds(item._id)}>Delete ad</div>,
                            key: '3',
                            danger: true,
                          },
                        ]
                      }
                    }
                    trigger={['hover']}
                  >
                    <div
                      className='cursor-pointer'
                    >
                      <Svg src={menuIcon} className='w-5' />
                    </div>
                  </Dropdown>
                </div>
              }
            >
              <List.Item.Meta
                avatar={<Avatar shape='square' size={56} src={item?.img} />}
                title={
                  <div className='flex'>
                    {item?.company}
                    <Status status={item?.status}/>
                  </div>
                }
                description={item?.createdAt && ` ${format(new Date(item.createdAt), DATE)}`}
              />
              {item?.title}
            </List.Item>
          )}
        />
      </Spin>

      <ModalAds
        visible={visibleModalAd}
        setVisible={setVisibleModalAd}
        afterSuccess={refetch}
        adData={editAds}
        setEditAds={setEditAds}
      />
    </>
  )
}

export default ManageAds