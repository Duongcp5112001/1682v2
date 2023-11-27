import React, { useEffect, useRef, useState } from 'react';
import sendIcon from '~/assets/images/sendIcon.svg'
import xMarkIcon from '~/assets/images/xMarkIcon.svg'
import Svg from '../Svg';
import { socket } from "~/socket";
import { List, message } from 'antd'

import { RootState, useAppDispatch, useAppSelector } from '~/store';
import { sendMessage } from '~/api/member';
import { setMessages } from '~/store/chatMessages';
import Input from '../Input';
import { SUCCESS } from '~/utils/constant';
import { encryptionUserName } from '~/utils/helper';

interface Props {
  open: boolean;
  setVisible: (value: boolean) => void;
  userId: string;
  onClose: () => void;
  receiverData: any;
}

const ChatModal = (props: Props) => {
  const { open, setVisible, userId, receiverData, onClose } = props;
  const lastItemRef = useRef<any>(null);

  const userData = useAppSelector((state) => state.userInfo.userData);

  const messages = useAppSelector(
    (state: RootState) => state.chatMessages.messages
  );

  const receiver = useAppSelector(
    (state: RootState) => state.chatMessages.receiver
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const [value, setValue] = useState<string>("");

  const handleSend = async () => {
    try {
      const res = await sendMessage(receiver, value);

      if (res.msg === SUCCESS) {
        const { messages } = res.data;

        setValue(() => "");
        dispatch(setMessages(messages));
      }
    } catch (error) {
      message.error(String(error));
    }
  };

  useEffect(() => {
    if (open) {
      socket.connect();

      socket.on(userId, (value) => {
        const { messages } = value;

        dispatch(setMessages(messages.messages));
      });
    } else {
      socket.disconnect();
    }

    return () => {
      socket.disconnect();
    };
  }, [open]);

  return (
    <div className={`${open ? 'fixed' : 'hidden'} bottom-0 right-[70px] bg-indigo-50 flex flex-col items-center justify-center`}>
      <div className="w-80 h-96 flex flex-col border shadow-md bg-white">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center">
            <img className="rounded-full w-10 h-10" src={receiverData.avatar} />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">{encryptionUserName(receiverData.username)}</a>
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => setVisible(false)} className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
              <img className='w-6' src={xMarkIcon} alt="xmark" />
            </button>
          </div>
        </div>

        <div className="flex-1 px-4 py-4 overflow-y-auto">
          <List
            dataSource={messages}
            renderItem={(item, index) => (
                <List.Item
                  className='w-100'
                  key={item._id}
                  id={index === messages.length - 1 ? "last-item" : ""}
                  ref={index === messages.length - 1 ? lastItemRef : null}
                >
                  { item.from === userId ?
                    <div className="flex items-center flex-row-reverse w-100">
                      <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                        <img className="rounded-full w-10 h-10" src={userData?.avatar}  />
                      </div>
                      <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg relative">
                        <div> {item.content} </div>
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                      </div>
                    </div>
                    :
                    <div className="flex items-center w-100">
                      <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                        <img className="rounded-full w-10 h-10" src={receiverData?.avatar} />
                      </div>
                      <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg relative">
                        <div> {item.content} </div>
                        <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
                      </div>
                    </div>
                  }
                </List.Item>
            )}
          />


        </div>

        <div className="flex items-center border-t p-2">
          <div className="w-full mx-2">
            <Input
              value={value}
              placeholder='Aa'
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
          </div>

          <div>
            <button onClick={handleSend} className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
              <img className='w-7' src={sendIcon}/>
            </button>
          </div>

        </div>
      </div>

    </div>

  )
}

export default ChatModal