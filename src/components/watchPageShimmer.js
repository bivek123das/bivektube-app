import React from "react";

const WatchpageShimmer = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full px-2 lg:px-5 py-3 gap-4 animate-pulse">
      {/* Main Video Section */}
      <div className="flex-1 flex flex-col w-full lg:w-2/3 gap-4">
        {/* Video placeholder */}
        <div className="w-full h-0 relative" style={{ paddingTop: "56.25%" }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>

        {/* Video info placeholder */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>

      {/* Related Videos & Live Chat */}
      <div className="flex flex-col w-full lg:w-1/3 gap-4">
        {/* LiveChat placeholder */}
        <div className="hidden lg:block mb-4">
          <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>

        {/* Related videos placeholders */}
        <div className="flex flex-col gap-2">
          {Array(6)
            .fill("")
            .map((_, idx) => (
              <div
                key={idx}
                className="flex gap-2 px-2 py-2 rounded-xl cursor-pointer"
              >
                <div className="w-[168px] h-[94px] bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="flex flex-col justify-between flex-1 gap-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WatchpageShimmer;
