import React, { memo } from "react";
import { useSelector } from "react-redux";

const Button = ({ name, active, onClick }) => {
  const darkMode = useSelector((store) => store.theme.darkMode);
  
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 mr-2 rounded-full text-sm sm:text-base
        whitespace-nowrap transition-colors duration-200
        focus:outline-none
        flex items-center gap-1
        ${
          active
            ? darkMode
              ? "bg-white text-black"   // dark mode active
              : "bg-black text-white"   // light mode active
            : darkMode
            ? "bg-gray-700 text-white hover:bg-gray-600" // dark mode default
            : "bg-gray-100 text-gray-800 hover:bg-gray-200" // light mode default
        }
      `}
    >
      {name}
    </button>
  );
};

export default memo(Button);




