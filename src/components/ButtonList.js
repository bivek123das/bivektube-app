import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";

const ButtonList = () => {
  const lists = [
    "All",
    "Gaming",
    "Music",
    "Cricket",
    "Food",
    "Live",
    "Mixes",
    "Albums",
    "Javascript",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const darkMode = useSelector((store) => store.theme.darkMode); // get theme from Redux

  return (
    <div
      className={`
        flex items-center gap-2
        overflow-x-auto no-scrollbar
        whitespace-nowrap
        px-3 py-2
        ${darkMode ? "bg-[#2a3541]" : "bg-white"}
      `}
    >
      {lists.map((list, index) => (
        <Button
          key={index}
          name={list}
          active={activeIndex === index}
          onClick={() => setActiveIndex(index)}
        />
      ))}
    </div>
  );
};

export default ButtonList;



