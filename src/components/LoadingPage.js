import React from "react";
import { motion } from "framer-motion";

const LoadingPage = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-[#2a3541]">
      <motion.div
        className="h-12 w-12 border-4 border-t-transparent border-gray-800 dark:border-white rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
        {text}
      </p>
    </div>
  );
};

export default LoadingPage;
