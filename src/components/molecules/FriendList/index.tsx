import { List, Avatar, Menu, message } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { useFriends } from "~/hooks/useFriends";
import { RootState, useAppDispatch, useAppSelector } from "~/store";

import { setMessages, setReceiver } from "~/store/chatMessages";
// import { getMessages } from "~/api/user";
import { getCookie } from "~/utils/cookie";
import { encryptionUserName } from "~/utils/helper";

import loadable from "~/utils/loadable";
import { getMessages } from "~/api/member";
import { dispatch } from "~/reduxs";
import { SUCCESS } from "~/utils/constant";

const Spin = loadable(() => import("~/components/atoms/Spin"));
const ChatModal = loadable(() => import("~/components/atoms/ChatModal"));


// type MenuItem = Required<MenuProps>['items'][number];
const FriendList = () => {
  const userData = useAppSelector((state) => state.userInfo.userData);
  const token = getCookie('token')
  const [open, setOpen] = useState<boolean>(false);
  const [receiverData, setReceiverData] = useState<any>({});
  const { data, isLoading, isFetching } = useFriends(token);

  const friends = data?.data?.member?.friends;
  const onClose = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  const userMessages = useAppSelector(
    (state: RootState) => state.userInfo.messages
  );

  const handleClick = async (receiver: string) => {
    dispatch(setReceiver(receiver));
    try {
      const res = await getMessages(receiver);

      if (res.msg === SUCCESS) {
        const { messages } = res.data;

        dispatch(setMessages(messages));
        setOpen(true);
      } else {
        dispatch(setMessages([]));
        dispatch(setReceiver(""));
        message.error(res.message);
      }
    } catch (error) {
      message.error(String(error));
    }
  };

  const getLastMessage = (receiverId: string): string => {
    const matchedUserMessage = userMessages.filter(
      (message) => message.receiver._id === receiverId
    );

    if (!matchedUserMessage.length) {
      return "";
    }

    const { messages } = matchedUserMessage[0];

    if (!messages.length) {
      return "";
    }

    return messages[messages.length - 1].content;
  };

  // const handleShowChatModal = () => {
  //   setVisibelChatModal(true)
  // }

  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        className={styles.listContainer}
        dataSource={friends}
        renderItem={(item: any) => (
          <List.Item
            key={item?.friendId?._id}
            className={styles.friendItem}
            onClick={() => {
              setReceiverData(
                () => item.friendId
              );
              handleClick(item.friendId?._id);
            }}
          >
            {/* Show only the avatar when screen size is small */}
            <div className={styles.avatarContainer}>
              <List.Item.Meta
                avatar={<Avatar size={30} src={item?.friendId?.avatar} />}
              />
            </div>

            {/* Show the name and last message when screen size is large */}
            <div className={styles.detailsContainer}>
              <List.Item.Meta
                avatar={<Avatar size={40} src={item?.friendId?.avatar} />}
                title={encryptionUserName(item?.friendId?.username)}
                description={getLastMessage(item?.user?._id)}
              />
            </div>
          </List.Item>
        )}
      />

      <ChatModal
        open={open}
        onClose={onClose}
        userId={userData?._id}
        receiverData={receiverData}
        setVisible={setOpen}
      />
    </Spin>
  );
};

export default FriendList;
