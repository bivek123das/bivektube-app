import React from 'react';
import { useSelector } from 'react-redux';
import '../utils/videolist.css';

const VideoCard = ({ videoInfo }) => {
  const { snippet, statistics } = videoInfo;
  const { channelTitle, title, thumbnails } = snippet;
  const darkMode = useSelector((store) => store.theme.darkMode);

  return (
    <div
      className={`
        video-card 
        w-full 
        h-full
        min-h-[250px]
        flex flex-col 
        overflow-hidden 
        rounded-xl 
        shadow-lg 
        transition-transform 
        duration-200 
        ease-out 
        hover:scale-[1.03] 
        hover:shadow-2xl
        ${darkMode ? 'bg-[#1D232A]' : 'bg-white'}
      `}
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
        <h3 className={`font-bold text-sm line-clamp-2 ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          {title}
        </h3>
        <p className={`text-xs ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {channelTitle}
        </p>
        <p className={`text-xs ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {Math.floor(statistics?.viewCount / 100000)}k views
        </p>
      </div>
    </div>
  );
};

export default VideoCard;



