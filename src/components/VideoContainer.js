import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import Shimmer from './Shimmer';

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const json = await data.json();
    setVideos(json.items);
  };

  return videos.length === 0 ? (
    <Shimmer />
  ) : (
    <div
      className="
        grid 
        gap-4 
        px-2 sm:px-4 
        w-full
        grid-cols-1            /* full width on mobile */
        sm:grid-cols-2         /* 2 per row on small */
        lg:grid-cols-3         /* 3 per row on large */
        xl:grid-cols-4         /* 4 per row on extra large */
      "
    >
      {videos.map((video) => (
        <Link key={video.id} to={'/watch?v=' + video.id}>
          <VideoCard videoInfo={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;




