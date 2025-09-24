import React from 'react';
import '../utils/videolist.css';

const VideoCard = ({ videoInfo }) => {
  const { snippet, statistics } = videoInfo;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div
      className="
        video-card 
        w-full 
        flex flex-col 
        overflow-hidden 
        rounded-xl 
        shadow-lg 
      "
    >
      {/* Thumbnail with 16:9 aspect ratio */}
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="thumbnail"
          src={thumbnails?.medium?.url}
        />
      </div>

      {/* Video info */}
      <div className="p-2">
        <h3 className="font-bold text-sm line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-xs">{channelTitle}</p>
        <p className="text-gray-500 text-xs">
          {Math.floor(statistics?.viewCount / 100000)}k views
        </p>
      </div>
    </div>
  );
};

export default VideoCard;



