import { Button, Tabs, TabsProps, Upload, message } from 'antd';
import React, { useState } from 'react'
import { addFriend, unFriend } from '~/api/friend';
import { SUCCESS } from '~/utils/constant';
import {CameraOutlined} from '@ant-design/icons'
import { RootState, useAppDispatch, useAppSelector } from '~/store';
import { QK_MEMBER, useMemberById } from '~/hooks/useMember';
import { getCookie } from '~/utils/cookie';
import { getDownloadURL, getMetadata, ref, uploadBytesResumable } from 'firebase/storage';
import { updateAvatar, updateCoverImage } from '~/api/member';
import { checkFriend, encryptionUserName } from '~/utils/helper';
import { setStateRefetchUser } from '~/store/stateRefetchApi';

import storage from '~/utils/firebase';
import addFriendIconWhite from '~/assets/images/addFriendIconWhite.svg'
import shieldIcon from '~/assets/images/shieldIcon.svg'
import Svg from '~/components/atoms/Svg';
import Spin from '~/components/atoms/Spin';
import Infomations from './Infomations';
import Friends from './Friends';
import Post from './Post';
import TailwindButton from '~/components/atoms/TailwindButton';
import { useQueryClient } from '@tanstack/react-query';

import styles from './styles.module.scss'
interface Props {
  id?: string;
}

const Profile = ({id}: Props) => {
  const token = getCookie("token");
  const { data, isLoading, isFetching, refetch} = useMemberById({memberId: id});
  const memberData = data?.data?.memberFound;
  const [adding, setAdding] = useState(false);
  const [unfriending, setUnfriending] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const me = useAppSelector((state) => state.userInfo.userData);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const queryClient = useQueryClient();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Post`,
      children: <Post memberId={id}/>,
    },
    {
      key: '2',
      label: `Infomation`,
      children: <Infomations data={memberData}/>,
    },
    {
      key: '3',
      label: `Friend`,
      children: <Friends data={memberData}/>,
    }
  ];

  const dispatch = useAppDispatch();

  const userMessages = useAppSelector(
    (state: RootState) => state.userInfo.messages
  );

  const uploadFileToFirebase = async (doc: any, type: string) => {
    setLoadingUpload(true)
    const file = doc?.file;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    try {
      // Wait for the upload to finish
      const snapshot = await uploadTask;
      
      // Get the metadata using getMetadata() method
      const metadata = await getMetadata(storageRef);
  
      // Create the result object with metadata and download URL
      // Set the result in the state
      // setMetaData(result);
      if (type === 'avatar') {
        const result = {
          accountAvatarUpdate: await getDownloadURL(snapshot.ref)
        };
        const res = await updateAvatar(id, result);
        if (res.msg === SUCCESS) {
          refetch();
        } else {
          message.error("Upload image failed");
        }
      } else {
        const result = {
          accountCoverImageUpdate: await getDownloadURL(snapshot.ref)
        };
        const res = await updateCoverImage(id, result);
        if (res.msg === SUCCESS) {
          refetch();
        } else {
          message.error("Upload image failed");
        }
      }
      dispatch(setStateRefetchUser(true))
      setLoadingUpload(false)
    } catch (error: any) {
      console.error(error);
      setLoadingUpload(false)
    }
  };

  const handleRefetchAPI = async () => {
    await queryClient.invalidateQueries([QK_MEMBER]);
  };

  const handleAddFriend = async () => {
    setAdding(true)
    try {
      const res = await addFriend(id, {memberId: me?._id})
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Add friend success')
          refetch()
          handleRefetchAPI()
        } else {
          message.error('Add friend fail please try again!')
        }
      }
    } catch (error: any) {
      console.log(error)
    }
    setAdding(false)
  }

  const handleUnfriend = async () => {
    setUnfriending(true)
    try {
      const res = await unFriend(id, {memberId: me?._id})
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Unfriend success')
          refetch()
          handleRefetchAPI()
        } else {
          message.error('Unfriend friend fail!')
        }
      }
    } catch (error) {
      console.log(error)
    }
    setUnfriending(false)
  }

  return (
    <Spin spinning={isLoading || isFetching || loadingUpload}>
      <div className={styles.profileContainer}>
        <div className={styles.images}>
          <div className='relative h-[250px]'>
            <img
              src={memberData?.coverImage}
              alt="cover-image"
              className={styles.cover}
            />
            { memberData?._id === me?._id ?
              <Upload
                className='absolute right-5 bottom-5 max-w-fit'
                showUploadList={false}
                accept="image/*"
                customRequest={(file: any) => uploadFileToFirebase(file, 'cover')}
              >
                <Button
                  className='bg-slate-400 z-50'
                  icon={<CameraOutlined />}
                  type='primary'
                >
                  Edit the cover
                </Button>
              </Upload>
              : null
            }
          </div>
          <div
            className={`${styles.uploadAvatar} absolute top-[190px] w-100 object-cover`}
          >
            <div className='w-100 flex justify-center'>
            { memberData?._id === me?._id ?
              <Upload
                listType="picture-circle"
                // onChange={handleChange}
                showUploadList={false}
                accept="image/*"
                customRequest={(file: any) => uploadFileToFirebase(file, 'avatar')}              
              >
                <img
                  className='rounded-[50%] object-cover h-[110px] w-[110px]'
                  src={memberData?.avatar}
                />
              </Upload>
              :
                <img
                  className={styles.profilePic}
                  src={memberData?.avatar}
                />
              }
            </div>
            <div className='ml-[46%] justify-center'>
              { memberData?._id === me?._id 
                ? <p className='text-2xl font-semibold'>{memberData?.username}</p>
                :
                <div className='flex justify-between'>
                  <div className='text-2xl font-semibold'>
                    {encryptionUserName(memberData?.username)}
                  </div>
                  <div>
                    { checkFriend(me, memberData) ? 
                      <TailwindButton
                        customClass='flex items-center'
                        loading={unfriending}
                        type='default'
                        onClick={handleUnfriend}
                        icon={<Svg src={shieldIcon} className='w-5'/>}
                      >
                        Friend
                      </TailwindButton>
                      :
                      <Button
                        className='bg-btnAntd flex items-center'
                        icon={
                          <Svg  src={addFriendIconWhite} className='w-5'/>
                        } 
                        loading={adding} 
                        type='primary' 
                        onClick={handleAddFriend} 
                      >
                        Add friend
                      </Button>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="1" items={items} className='mt-[150px]' />
    </Spin>

  );
}

export default Profile