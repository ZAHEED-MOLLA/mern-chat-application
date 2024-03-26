import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  const{authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const [formattedTime,setFormmattedTime] = useState(extractTime(message.createdAt))
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : ";";

  useEffect(()=>{
    setFormmattedTime(extractTime(message.createdAt))
  },[message.createdAt])
  return (
    <div className= {`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt="Tailwind Css chat bubble component" />
        </div>
      </div>
      <div className={`chat-bubble text-white  ${bubbleBgColor} pb-2`}>
        {message.message}
      </div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  );
}

export default Message;
