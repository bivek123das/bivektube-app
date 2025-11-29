import React from "react";
import { useSelector } from "react-redux";

const WatchpageShimmer = () => {
  const darkMode = useSelector((store) => store.theme.darkMode);

  const baseColor = darkMode ? "#1D232A" : "#E5E5E5";
  const highlightColor = darkMode ? "#2a3541" : "#f3f3f3";
  const pageBgColor = darkMode ? "#212121" : "#b8b6b6";

  const shimmerStyle = {
    background: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  };

  return (
    <div className="flex flex-col lg:flex-row w-full px-2 lg:px-5 py-3 gap-4 animate-pulse " style={{ backgroundColor: pageBgColor }}>

      {/* Main Video Section */}
      <div className="flex-1 flex flex-col w-full lg:w-2/3 gap-4">
        
        {/* Video placeholder */}
        <div className="w-full h-0 relative" style={{ paddingTop: "56.25%" }}>
          <div
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            style={shimmerStyle}
          ></div>
        </div>

        {/* Video info placeholders */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="h-6 rounded w-1/2" style={shimmerStyle}></div>
          <div className="h-4 rounded w-1/3" style={shimmerStyle}></div>
          <div className="h-4 rounded w-1/4" style={shimmerStyle}></div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-full lg:w-1/3 gap-4">

        {/* Live Chat placeholder */}
        <div className="hidden lg:block mb-4">
          <div className="w-full h-60 rounded-xl" style={shimmerStyle}></div>
        </div>

        {/* Related videos */}
        <div className="flex flex-col gap-2">
          {Array(6).fill().map((_, idx) => (
            <div
              key={idx}
              className="flex gap-2 px-2 py-2 rounded-xl cursor-pointer"
            >
              <div
                className="w-[168px] h-[94px] rounded-xl"
                style={shimmerStyle}
              ></div>

              <div className="flex flex-col justify-between flex-1 gap-1">
                <div className="h-4 rounded w-full" style={shimmerStyle}></div>
                <div className="h-3 rounded w-3/4" style={shimmerStyle}></div>
                <div className="h-3 rounded w-1/2" style={shimmerStyle}></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WatchpageShimmer;


