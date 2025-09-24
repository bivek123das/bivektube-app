import React from "react";
import { useSelector } from "react-redux";

const ShimmerCard = () => {
  const darkMode = useSelector((store) => store.theme.darkMode);

  const baseColor = darkMode ? "#1D232A" : "#E5E5E5";
  const highlightColor = darkMode ? "#2a3541" : "#f3f3f3";

  return (
    <div className="video-card p-2 shadow-lg rounded-xl box-border w-full h-[280px] flex flex-col overflow-hidden animate-pulse">
      {/* Thumbnail placeholder */}
      <div
        className="relative w-full pb-[56.25%] rounded-xl mb-2"
        style={{
          background: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      ></div>

      {/* Text placeholders */}
      <div className="flex-1 flex flex-col justify-between">
        <div
          className="w-full h-4 rounded-md mb-2"
          style={{
            background: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
        <div
          className="w-3/4 h-3 rounded-md mb-1"
          style={{
            background: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
        <div
          className="w-1/2 h-3 rounded-md"
          style={{
            background: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        ></div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4 w-full">
      <div
        className="
          grid
          gap-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {Array(20)
          .fill()
          .map((_, index) => (
            <ShimmerCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default Shimmer;

