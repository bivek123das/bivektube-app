import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY, YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoDatas from "./VideoDatas";
import LiveChat from "./LiveChat";
import WatchpageShimmer from "./watchPageShimmer";

const Watchpage = () => {
  const [searchParams] = useSearchParams();
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const videoId = searchParams.get("v");
  const mainVideoRef = useRef(null);

  const dispatch = useDispatch();

  const scrollToMainVideo = () => {
    if (mainVideoRef.current) {
      mainVideoRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "center",
        inline: "nearest"
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoData();
    fetchRelatedVideos();
    scrollToMainVideo();
  }, [videoId]);

  const extractVideoId = (video) => {
    if (!video) return '';
    if (typeof video.id === 'string') return video.id;
    return video.id?.videoId || '';
  };

  const fetchVideoData = async () => {
    try {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`
      );
      const json = await data.json();
      setVideoData(json.items[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      setRelatedVideos(json.items);
    } catch (err) {
      console.error(err);
    }
  };

  if (!videoData) return <WatchpageShimmer />;

  return (
    <div className="flex flex-col lg:flex-row w-full px-2 lg:px-5 py-3 gap-4">
    {/* Main Video Section */}
    <div
      ref={mainVideoRef}
      className="flex-1 flex flex-col w-full lg:w-2/3 gap-4 lg:h-[calc(100vh-80px)] lg:overflow-y-auto"
    >
      <div className="w-full relative" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <VideoDatas vdata={videoData} vId={videoId} />
      </div>
    </div>
  
    {/* Related Videos & Live Chat */}
    <div className="flex flex-col w-full lg:w-[calc(33.333%-16px)] h-[calc(100vh-80px)] overflow-y-auto gap-4 sticky top-10">
      {/* LiveChat hidden on small devices */}
      <div className="hidden lg:block mb-4">
        <LiveChat />
      </div>
  
      {/* Related videos container adjusts width automatically */}
      <div className="flex flex-col gap-2">
        {relatedVideos?.slice(0, 20)?.map((video) => {
          const relatedId = extractVideoId(video);
          if (!relatedId) return null;
          return (
          <Link
            key={relatedId}
            to={`/watch?v=${relatedId}`}
            onClick={scrollToMainVideo}
            className="group block"
          >
            <div className="flex gap-2 px-2 py-2 rounded-xl cursor-pointer transition-transform duration-200 ease-out group-hover:scale-[1.02]">
              <img
                className="rounded-xl w-[168px] h-[94px] object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                alt="thumbnail"
                src={video?.snippet?.thumbnails?.medium?.url}
              />
              <div className="flex flex-col justify-between flex-1">
                <p className="font-medium text-sm line-clamp-2 group-hover:text-blue-600">
                  {video?.snippet?.title}
                </p>
                <p className="text-gray-500 text-xs group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  {video?.snippet?.channelTitle}
                </p>
                <p className="text-gray-500 text-xs">
                  100 views ·{" "}
                  {(
                    Math.abs(new Date(video?.snippet?.publishedAt) - new Date()) /
                    (60 * 60 * 24 * 1000)
                  ).toFixed(1)}{" "}
                  days ago
                </p>
              </div>
            </div>
          </Link>
        );
        })}
      </div>
    </div>
  </div>
  
  );
};

export default Watchpage;




