import { Avatar, Button, Col, Divider, Row, Tabs, TabsProps, Tooltip, Typography, Upload, message } from 'antd';
import React, { useState } from 'react'
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import Spin from '~/components/atoms/Spin';
import styles from './styles.module.scss'
import { addFriend } from '~/api/friend';
import { SUCCESS, UserRole } from '~/utils/constant';
import {CameraOutlined} from '@ant-design/icons'
import { RootState, useAppDispatch, useAppSelector } from '~/store';
import Infomations from './Infomations';
import Friends from './Friends';
import Post from './Post';
// import { setMessages, setReceiver } from '~/store/chatMessages';
// import { getMessages, warningUser } from '~/api/user';
import ModalConfirm from '~/components/atoms/ModalConfirm';
import Input from '~/components/atoms/Input';
import { Authorization } from '~/wrapper/Authorization';
import { useMember, useMemberById } from '~/hooks/useMember';
import { getCookie } from '~/utils/cookie';
import { setReceiver } from '~/store/chatMessages';
import { usePostByMemberId } from '~/hooks/usePost';
import { getDownloadURL, getMetadata, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '~/utils/firebase';
import { updateAvatar, updateCoverImage, updateProfile } from '~/api/member';
import addFriendIcon from '~/assets/images/addFriendIcon.svg'
import Svg from '~/components/atoms/Svg';
import { checkFriend, encryptionUserName } from '~/utils/helper';
import { setStateRefetchUser } from '~/store/stateRefetchApi';
import { Any } from '@react-spring/web';
interface Props {
  id?: string;
}

const Profile = ({id}: Props) => {
  const token = getCookie("token");
  const { data, isLoading, isFetching, refetch} = useMemberById({memberId: id});
  const memberData = data?.data?.memberFound;
  const [adding, setAdding] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const me = useAppSelector((state) => state.userInfo.userData);
  const [openChat, setOpenChat] = useState(false);
  const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
  const [messageWarn, setMessagesWarn] = useState('')
  // const handleAddFriend = async () => {
  //   setAdding(true)
  //   const res = await addFriend(userId);
  //   if (res.message === SUCCESS) {
  //     message.success('Add friend success')
  //   } else {
  //     message.error(res.message)
  //   }
  //   setAdding(false);
  // }

  const onCloseChat = () => {
    setOpenChat(false);
  };

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

  // const handleClick = async (receiver: string) => {
  //   dispatch(setReceiver(receiver));

  //   try {
  //     const res = await getMessages(receiver);

  //     if (res && res.errorCode === 0 && !res.errors.length) {
  //       const { messages } = res.data;

  //       dispatch(setMessages(messages));
  //       setOpenChat(true);
  //     } else {
  //       dispatch(setMessages([]));
  //       dispatch(setReceiver(""));
  //       message.error(res.message);
  //     }
  //   } catch (error) {
  //     message.error(String(error));
  //   }
  // };

  // const handleWarning = async () => {
  //   if (!messageWarn) return message.error('Please enter message');
  //   const res = await warningUser(userId, {message: messageWarn} );
  //   if (res.message === SUCCESS) {
  //     message.success('Warning success')
  //     setVisibleModalConfirm(false)
  //   } else {
  //     message.error(res.message)
  //   }
  // }

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

  const handleAddFriend = async () => {
    try {
      const res = await addFriend(id, {memberId: me?._id})
      if (res) {
        if (res.msg === SUCCESS) {
          message.success('Add friend success')
          refetch()
        } else {
          message.error('Add friend fail please try again!')
        }
      }
    } catch (error: any) {
      console.log(error)
    }
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
            <div className='flex text-base font-semibold justify-center'>
              { memberData?._id === me?._id 
                ? memberData?.username 
                :
                <div className='flex'>
                  {encryptionUserName(memberData?.username)}
                  { checkFriend(me, memberData) ? null :
                    <Svg onClick={handleAddFriend} className='w-5 ml-3' src={addFriendIcon}/>
                  }
                </div>
              }
            </div>
          </div>
        </div>
        {/* <div className={styles.btnGroup}>
          { me && me?.following?.find((item: any) => (item.user._id === userId)) ? 
            <Button icon={<UserDeleteOutlined />}>Friend</Button>
            : me?._id !== userId &&
            <Button disabled={adding} type="primary" onClick={handleAddFriend}>Add Friend</Button>
          }
          { me && me?._id !== userId &&
            <Button 
              type='primary' 
              className='ml-2'
            >
              Chat now
            </Button>
          }
        </div> */}
      </div>

      <Tabs defaultActiveKey="1" items={items} className='mt-[100px]' />
    </Spin>

  );
}

export default Profile