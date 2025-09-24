import React, { useEffect, useState } from "react";
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoData();
    fetchRelatedVideos();
  }, [videoId]);

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
    <div className="flex-1 flex flex-col w-full lg:w-2/3 gap-4">
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
        {relatedVideos?.slice(0, 20)?.map((video) => (
          <Link
            key={video?.id}
            to={`/watch?v=${video?.id}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="flex gap-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl cursor-pointer">
              <img
                className="rounded-xl w-[168px] h-[94px] object-cover"
                alt="thumbnail"
                src={video?.snippet?.thumbnails?.medium?.url}
              />
              <div className="flex flex-col justify-between flex-1">
                <p className="font-medium text-sm line-clamp-2">
                  {video?.snippet?.title}
                </p>
                <p className="text-gray-500 text-xs">{video?.snippet?.channelTitle}</p>
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
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Watchpage;




