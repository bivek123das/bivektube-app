import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import '../utils/sidebar.css';

const Sidebar = () => {

  const isMenuOpen = useSelector(store => store.app.isMenuOpen);
  const darkMode = useSelector(store => store.theme.darkMode);

  // Prevent scroll propagation to main container
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  // Early Return Pattern
  if(!isMenuOpen) return null ;


  return (
    <div 
      className={`sidebar z-20 w-64 md:w-72 shadow-xl h-screen overflow-y-auto overflow-x-hidden ${
        darkMode ? 'bg-[#1D232A] text-white' : 'bg-white text-black'
      }`}
      onWheel={handleWheel}
      onScroll={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div className='px-4'>
          <div className={`p-4 border-b-[1px] mb-1 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
               <ul>
                  <li>
                    <Link 
                      to="/" 
                      className={`hover:opacity-80 transition-opacity ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Shorts</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Subscriptions</li>
               </ul>
          </div>
          <div className={`p-4 border-b-[1px] mb-1 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
              <h2 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Subscriptions</h2>
               <ul>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Music</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Sports</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Gaming</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Movies</li>
               </ul>
          </div>
          <div className={`p-4 border-b-[1px] mb-1 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
              <h2 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Explore</h2>
               <ul>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Trending</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Shopping</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Music</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Movies</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Live</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Gaming</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>News</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Sports</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Courses</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Fashion & Beauty</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Podcasts</li>
               </ul>
          </div>
          <div className={`p-4 border-b-[1px] mb-1 ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
              <h2 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>Subscriptions</h2>
               <ul>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Music</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Sports</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Gaming</li>
                  <li className={`cursor-pointer hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Movies</li>
               </ul>
          </div>
      </div>
    </div>
  )
}

export default Sidebar
