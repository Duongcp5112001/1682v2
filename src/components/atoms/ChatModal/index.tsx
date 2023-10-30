import React, { useState } from 'react';
import sendIcon from '~/assets/images/sendIcon.svg'
import xMarkIcon from '~/assets/images/xMarkIcon.svg'
import Svg from '../Svg';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

const ChatModal = (props: Props) => {
  const { visible, setVisible} = props;
  return (
    <div className={`${visible ? 'fixed' : 'hidden'} bottom-0 right-[70px] bg-indigo-50 flex flex-col items-center justify-center`}>
      <div className="w-80 h-96 flex flex-col border shadow-md bg-white">
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center">
            <img className="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <div className="pl-2">
              <div className="font-semibold">
                <a className="hover:underline" href="#">John Doe</a>
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

          <div className="flex items-center mb-4">
            <div className="flex-none flex flex-col items-center space-y-1 mr-4">
              <img className="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            </div>
            <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
            </div>
          </div>

          <div className="flex items-center flex-row-reverse mb-4">
            <div className="flex-none flex flex-col items-center space-y-1 ml-4">
              <img className="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            </div>
            <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>

              <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex-none flex flex-col items-center space-y-1 mr-4">
              <img className="rounded-full w-10 h-10" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            </div>
            <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
              <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
              <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
            </div>
          </div>

        </div>

        <div className="flex items-center border-t p-2">
          <div className="w-full mx-2">
            <input className="p-1 w-full rounded-lg border border-gray-200" type="text" value="" placeholder="Aa" autoFocus/>
          </div>

          <div>
            <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
              <img className='w-7' src={sendIcon}/>
            </button>
          </div>

        </div>
      </div>

    </div>

  )
}

export default ChatModal