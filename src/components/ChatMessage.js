import React from 'react'

import '../utils/watchpage.css';

const ChatMessage = ({name,message}) => {
  
  return (
    <div className='flex  items-center shadow-sm py-2 chat'>
         <img className='h-7' alt="user"  src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/>
         <span className='px-2 font-bold'>{name}</span>
         <span>{message}</span>
    </div>
  )
}

export default ChatMessage;
