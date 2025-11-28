import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { toggleTheme } from "../utils/themeSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";
import bivekTube from "../utils/BIVEKTUBE.png";
import axios from "axios";
import jsonpAdapter from "axios-jsonp";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchCache = useSelector((store) => store.search);
  const darkMode = useSelector((store) => store.theme.darkMode);

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery) {
        setSuggestions([]);
        return;
      }
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSuggestions();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSuggestions = async () => {
    try {
      const res = await axios({
        url: YOUTUBE_SEARCH_API,
        adapter: jsonpAdapter,
        params: {
          client: "youtube",
          hl: "en",
          ds: "yt",
          q: searchQuery,
        },
      });
      const data = res.data[1].map((item) => item[0]);
      dispatch(cacheResults({ [searchQuery]: data }));
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSuggestion = (event) => {
    setSearchQuery(event.target.innerText);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    navigate("/search?search_query=" + encodeURI(event.target.innerText));
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    handleClickSuggestion(event);
  };

  const toggleMenuHandler = () => dispatch(toggleMenu());

  const handleToggleTheme = () => dispatch(toggleTheme());

  return (
    <header
      className={`sticky top-0 z-50 w-full flex items-center justify-between p-3 md:p-4 shadow-md`}
      style={{ backgroundColor: darkMode ? "#1D232A" : "#ffffff" }}
    >
      {/* Left: Menu + Logo */}
      <div className="flex items-center">
        <button
          onClick={toggleMenuHandler}
          className="p-2 md:p-3 text-2xl focus:outline-none hidden md:block"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <a href="/" className="flex items-center ml-3 md:ml-6">
          <img
            className="w-8 md:w-10 rounded-full"
            src={bivekTube}
            alt="logo"
          />
          <h4
            className={`ml-2 font-bold text-lg md:text-2xl ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            BivekTube <sup className="text-xs">IN</sup>
          </h4>
        </a>
      </div>

      {/* Desktop search */}
{/* Desktop search */}
<div className="hidden md:flex flex-1 mx-4 md:mx-8 relative">
  <div className="flex w-full relative">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setShowSuggestions(true)}
      placeholder="Search"
      className={`flex-1 py-2 px-3 rounded-full border border-gray-400 outline-none pr-10 ${
        darkMode
          ? "bg-[#1D232A] text-white border-gray-600 placeholder-gray-400"
          : "bg-white text-black placeholder-gray-500"
      }`}
    />

    {/* Clear button inside input */}
    {searchQuery && (
      <button
        onClick={() => {
          setSearchQuery("");
          setShowSuggestions(false);
        }}
        className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none`}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    )}

    {/* Search button */}
    <button
      className={`absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-r-full border border-l-0 border-gray-400 ${
        darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>

  {/* Desktop suggestions */}
  {showSuggestions && suggestions.length > 0 && (
    <ul
      className={`absolute top-full left-0 w-full mt-1 max-h-60 overflow-y-auto shadow-lg rounded-lg z-50 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {suggestions.map((suggestion, idx) => (
        <li
          key={idx}
          onMouseDown={handleClickSuggestion}
          onTouchStart={handleTouchStart}
          className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap"
        >
          <i className="fa-solid fa-magnifying-glass mr-2"></i>
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>



      {/* Right section */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Mobile search icon */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none md:hidden"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {/* Mobile search overlay */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ease-out transform p-3 flex flex-col shadow-lg w-full ${
            mobileSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{
            backgroundColor: darkMode ? "#1D232A" : "#ffffff",
          }}
        >
          <div className="flex items-center w-full">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search"
              className={`flex-1 outline-none px-3 py-2 rounded-l-full border border-gray-400 ${
                darkMode
                  ? "bg-[#1D232A] text-white border-gray-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              }`}
            />
            <button
              onClick={() => setMobileSearchOpen(false)}
              className={`px-4 py-2 rounded-r-full border border-l-0 border-gray-400 ${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
              }`}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Mobile suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className={`mt-2 max-h-60 overflow-y-auto rounded-lg ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onMouseDown={handleClickSuggestion}
                  onTouchStart={handleTouchStart}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap"
                >
                  <i className="fa-solid fa-magnifying-glass mr-2"></i>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Dark/Light toggle icon */}
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-full  focus:outline-none"
        >
          {darkMode ? (
            <i className="fa-regular fa-sun text-lg"></i>
          ) : (
            <i className="fa-regular fa-moon text-lg"></i>
          )}
        </button>

        {/* User icon */}
        <button className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <i className="fa-solid fa-user"></i>
        </button>
      </div>
    </header>
  );
};

export default Head;
