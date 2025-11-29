import React from "react";
import { useSelector } from "react-redux";
import "../utils/watchpage.css";

const CommentCard = ({ comt }) => {
  const darkMode = useSelector((store) => store.theme.darkMode);
  const { snippet } = comt?.snippet?.topLevelComment;
  
  return (
    <div className={`p-2 my-2 border-b comment-card ${
      darkMode ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center">
        <div>
          <img
            className="rounded-3xl bg-cover"
            alt="authorImage"
            src={snippet?.authorProfileImageUrl}
          />
        </div>
        <div className="ml-2">
          <p className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            {snippet?.authorDisplayName}
          </p>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {snippet?.textOriginal}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
