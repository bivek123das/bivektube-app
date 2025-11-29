import React from 'react'
import { useSelector } from 'react-redux';
import '../utils/watchpage.css';

const ChatMessage = ({name,message}) => {
  const darkMode = useSelector((store) => store.theme.darkMode);
  
  return (
    <div className={`flex items-center shadow-sm py-2 chat ${
      darkMode ? 'text-white' : 'text-black'
    }`}>
         <img className='h-7' alt="user"  src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"/>
         <span className={`px-2 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{name}</span>
         <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{message}</span>
    </div>
  )
}

export default ChatMessage;
