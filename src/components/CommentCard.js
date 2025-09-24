import React from "react";
import "../utils/watchpage.css";
const CommentCard = ({ comt }) => {
  // console.log(comt?.snippet?.topLevelComment);
  const { snippet } = comt?.snippet?.topLevelComment;
  return (
    <div className="p-2 my-2 border-b border-gray-200 comment-card">
      <div className="flex items-center">
        <div>
          <img
            className="rounded-3xl bg-cover"
            alt="authorImage"
            src={snippet?.authorProfileImageUrl}
          />
        </div>
        <div className="ml-2">
          <p className="font-bold">{snippet?.authorDisplayName}</p>
          <p>{snippet?.textOriginal}</p>
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
