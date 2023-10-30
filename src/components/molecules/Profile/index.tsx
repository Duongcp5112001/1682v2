import { Avatar, Button, Col, Divider, Row, Tabs, TabsProps, Tooltip, Typography, message } from 'antd';
import React, { useState } from 'react'
import { UserOutlined, WarningOutlined } from '@ant-design/icons';
import Spin from '~/components/atoms/Spin';
import styles from './styles.module.scss'
import { addFriend } from '~/api/friend';
import { SUCCESS, UserRole } from '~/utils/constant';
import {UserDeleteOutlined} from '@ant-design/icons'
import { RootState, useAppDispatch, useAppSelector } from '~/store';
import Infomations from './Infomations';
import Friends from './Friends';
import Post from './Post';
// import { setMessages, setReceiver } from '~/store/chatMessages';
// import { getMessages, warningUser } from '~/api/user';
import ModalConfirm from '~/components/atoms/ModalConfirm';
import Input from '~/components/atoms/Input';
import { Authorization } from '~/wrapper/Authorization';
import { useMember } from '~/hooks/useMember';
import { getCookie } from '~/utils/cookie';
import { setReceiver } from '~/store/chatMessages';
import { usePostByMemberId } from '~/hooks/usePost';

interface Props {
  id?: string;
}

const Profile = ({id}: Props) => {
  const token = getCookie("token");
  const { data, isLoading, isFetching } = useMember(token);
  const memberData = data?.member;
  const [adding, setAdding] = useState(false);
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

  return (
    <Spin spinning={isLoading || isFetching}>
      <div className={styles.profileContainer}>
        <div className={styles.images}>
          <img
            src={memberData?.coverImage}
            alt=""
            className={styles.cover}
          />
          <img
            src={memberData?.avatar}
            className={styles.profilePic}
            alt=""
          />
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

      <Tabs defaultActiveKey="1" items={items} className='mt-[80px]' />
    </Spin>

  );
}

export default Profile