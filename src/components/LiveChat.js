import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import { generate, getrandommessage } from '../utils/helper';

const LiveChat = () => {
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat.messages);
  const darkmode = useSelector((store) => store.theme.darkMode);

  const [liveMessage, setLiveMessage] = useState('');

  // Simulate live chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        addMessage({
          name: generate(),
          message: getrandommessage(20),
        })
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!liveMessage.trim()) return;

    dispatch(
      addMessage({
        name: 'Bivek Das',
        message: liveMessage,
      })
    );
    setLiveMessage('');
  };

  return (
    <div
      className="flex flex-col h-[80vh] w-full md:w-96 p-2 rounded-xl border"
      style={{
        backgroundColor: darkmode ? '#2a3541' : '#ffffff',
        borderColor: darkmode ? '#4b5563' : '#d1d5db',
      }}
    >
      {/* Chat messages container */}
      <div
        className="flex-1 overflow-y-auto flex flex-col-reverse p-2 rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800"
      >
        {chatMessage.map((c, i) => (
          <ChatMessage key={i} name={c.name} message={c.message} />
        ))}
      </div>

      {/* Input form */}
      <form
        onSubmit={handleSendMessage}
        className="flex mt-2 w-full rounded-lg overflow-hidden"
      >
        <input
          type="text"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Type a message..."
          className={`flex-1 px-3 py-2 outline-none border-r ${
            darkmode
              ? 'bg-[#2a3541] border-gray-700 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-black placeholder-gray-500'
          }`}
        />
        <button
          type="submit"
          className={`px-4 py-2 font-semibold ${
            darkmode
              ? 'bg-green-600 text-white hover:bg-green-500'
              : 'bg-green-400 text-black hover:bg-green-300'
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;


