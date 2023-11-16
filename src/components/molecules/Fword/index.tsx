import React, { useMemo, useState } from 'react'
import { Avatar, Divider, Dropdown, Input, List, message } from 'antd'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { ROUTES } from '~/routes'
import { AllStatus, DATE, SUCCESS } from '~/utils/constant'
import { getCookie } from '~/utils/cookie'

import Svg from '~/components/atoms/Svg'
import menuIcon from '~/assets/images/menuIcon.svg'
import iconPlusWhite from '~/assets/images/plusIconWhite.svg'
import Spin from '~/components/atoms/Spin'
import TailwindButton from '~/components/atoms/TailwindButton'
import ModalFword from './ModalFword'
import { useFwordList } from '~/hooks/useFword'
import { deleteFword } from '~/api/admin'
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
const ManageFWords = () => {
  const token = getCookie('token')
  const {data, isFetching, isLoading, refetch} = useFwordList(token)
  const dataFwords = data?.data;
  const [visibleModalFword, setVisibleModalFword] = useState(false)
  const [filterFword, setFilterFword] = useState('')
  const [editFword, setEditFword] = useState<any>({})

  const filterData = useMemo(() => {
    if (filterFword && dataFwords) {
      return dataFwords.filter((item: any) => item.word?.toLowerCase()?.includes(filterFword.toLowerCase()))
    } else return dataFwords
  }, [dataFwords, filterFword])
  const handleShowModalFword = () => {
    setVisibleModalFword(true)
  }

  const handleShowModalEditFword = (fword: any) => {
    setEditFword(fword)
    setVisibleModalFword(true)
  }

  const handleDeleteFword =async (fwordId: any) => {
    try {
      const res = await deleteFword(fwordId)
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Deltete ad success')
          refetch()
        } else {
          message.error('Deltete forbidden word fail please try again!')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='flex justify-between'>
        <h3 className='text-2xl'>Manage forbidden word</h3>
        <div className='flex items-center'>
          <Input
            addonAfter={<SearchOutlined />}
            className="w-[500px] border-primary" 
            placeholder="Search forbidden word"
            onChange={(e: any) =>  setFilterFword(e.target.value)}
          />
          <TailwindButton type='primary' customClass='flex items-center ml-3' onClick={handleShowModalFword}>
            <Svg src={iconPlusWhite} className='w-3 mr-2'/>
            Add forbidden word
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
                  <Dropdown
                    menu={
                      {
                        items: [
                          {
                            label: <div onClick={() => handleShowModalEditFword(item)}>Edit forbidden word</div>,
                            key: '1',
                          },
                          {
                            label: <div onClick={() => handleDeleteFword(item._id)}>Delete forbidden word</div>,
                            key: '2',
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
                title={
                  <div className='flex'>
                    {item?.word}
                  </div>
                }
                description={item?.createdAt && ` ${format(new Date(item.createdAt), DATE)}`}
              />
              {item?.title}
            </List.Item>
          )}
        />
      </Spin>

      <ModalFword
        visible={visibleModalFword}
        setVisible={setVisibleModalFword}
        afterSuccess={refetch}
        fWords={editFword}
        setEditFword={setEditFword}
      />
    </>
  )
}

export default ManageFWords