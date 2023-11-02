import { Avatar, Button, Col, Divider, Row, Tabs, TabsProps, Tooltip, Typography, Upload, message } from 'antd';
import React, { useState } from 'react'
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import Spin from '~/components/atoms/Spin';
import styles from './styles.module.scss'
import { addFriend } from '~/api/friend';
import { SUCCESS, UserRole } from '~/utils/constant';
import {CameraOutlined} from '@ant-design/icons'
import { RootState, useAppDispatch, useAppSelector } from '~/store';
import Friends from './Member';
import Post from './Post';

import { getCookie } from '~/utils/cookie';
import { getDownloadURL, getMetadata, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '~/utils/firebase';
import { updateAvatar, updateCoverImage } from '~/api/member';
import addFriendIcon from '~/assets/images/addFriendIcon.svg'
import Svg from '~/components/atoms/Svg';
import { checkFriend, encryptionUserName } from '~/utils/helper';
import { setStateRefetchUser } from '~/store/stateRefetchApi';
import { useGroupDetail } from '~/hooks/useGroup';

interface Props {
  id?: string;
}

const Group = ({id}: Props) => {
  const token = getCookie("token");
  const { data, isLoading, isFetching, refetch} = useGroupDetail(id);
  const groupData = data?.group;
  const [adding, setAdding] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const me = useAppSelector((state) => state.userInfo.userData);

  // const items: TabsProps['items'] = [
  //   {
  //     key: '1',
  //     label: `Post`,
  //     children: <Post memberId={id}/>,
  //   },
  //   {
  //     key: '3',
  //     label: `Friend`,
  //     children: <Friends data={groupData}/>,
  //   }
  // ];

  const dispatch = useAppDispatch();

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


  return (
    <Spin spinning={isLoading || isFetching || loadingUpload}>
      <div className={styles.profileContainer}>
        <div className={styles.images}>
          <div className='relative h-[220px]'>
            <img
              src={groupData?.coverImage}
              alt="cover-image"
              className={styles.cover}
            />
            { groupData?.updatedBy === me?._id ?
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
            className={`${styles.uploadAvatar} absolute top-[170px] w-100 object-cover`}
          >
            <div className='w-100 flex justify-center'>
            { groupData?.updatedBy === me?._id ?
              <Upload
                listType="picture-circle"
                // onChange={handleChange}
                showUploadList={false}
                accept="image/*"
                customRequest={(file: any) => uploadFileToFirebase(file, 'avatar')}              
              >
                <img
                  className='rounded-[50%] object-cover h-[110px] w-[110px]'
                  src={groupData?.avatar}
                />
              </Upload>
              :
                <img
                  className={styles.profilePic}
                  src={groupData?.avatar}
                />
              }
            </div>
            <div className='flex text-base font-semibold justify-center'>
              <div className='flex'>
                {groupData?.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Post dataPost={data} isFetching={isFetching} isLoading={isLoading} refetch={refetch}/>
    </Spin>

  );
}

export default Group