import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import Shimmer, { ShimmerCard } from './Shimmer';

const VideoContainer = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const darkMode = useSelector((store) => store.theme.darkMode);
  const CARDS_PER_PAGE = 12;

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEOS_API);
      const json = await data.json();
      setAllVideos(json.items || []);
      // Show first 12 cards initially
      setDisplayedVideos(json.items?.slice(0, CARDS_PER_PAGE) || []);
      setHasMore(json.items?.length > CARDS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const loadMoreVideos = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Simulate slight delay for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * CARDS_PER_PAGE;
      const endIndex = startIndex + CARDS_PER_PAGE;
      const nextVideos = allVideos.slice(startIndex, endIndex);

      if (nextVideos.length > 0) {
        setDisplayedVideos((prev) => [...prev, ...nextVideos]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < allVideos.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 300);
  }, [currentPage, allVideos, isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreVideos();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreVideos, hasMore, isLoading]);

  if (allVideos.length === 0) {
    return <Shimmer />;
  }

  return (
    <>
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
        {displayedVideos.map((video) => (
          <Link
            key={video.id}
            to={'/watch?v=' + video.id}
            className="h-full"
          >
            <VideoCard videoInfo={video} />
          </Link>
        ))}
      </div>

      {/* Shimmer cards while loading more */}
      {isLoading && (
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
          {Array(CARDS_PER_PAGE)
            .fill()
            .map((_, index) => (
              <ShimmerCard key={`shimmer-${index}`} />
            ))}
        </div>
      )}

      {/* Observer target for infinite scroll */}
      {hasMore && !isLoading && (
        <div ref={observerTarget} className="h-10"></div>
      )}

      {!hasMore && displayedVideos.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            No more videos to load
          </span>
        </div>
      )}
    </>
  );
};

export default VideoContainer;




