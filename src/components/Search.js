import React,{useEffect, useState} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { YOUTUBE_SEARCH_VIDEO_WITH_QUERY_API } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../utils/appSlice';
import '../utils/search.css';

const Search = () => {

  const [searchparams] = useSearchParams();
  const[videos,setVideos] = useState([]);
  const darkMode = useSelector((store) => store.theme.darkMode);

  let searchquery = searchparams.get('search_query');

  const dispatch = useDispatch();


  useEffect(()=>{
     dispatch(openMenu());
     getVideos();
  },[searchquery]);

  const getVideos = async ()=>{
        const res = await fetch(YOUTUBE_SEARCH_VIDEO_WITH_QUERY_API + searchquery);
        const json = await res.json();
        console.log(json?.items);
        setVideos(json?.items);
    }
  return (

         <div className={`srch-h px-3 col-span-11 mt-10 ${
           darkMode ? 'bg-[#2a3541]' : 'bg-white'
         }`}>
            <div className='flex flex-col srch-sh px-3  items-center'>
                <div className='srch-head p-2 m-2'>
                    {videos?.map(video =>
                        <Link 
                          key={video?.id?.videoId || video?.etag} 
                          to={'/watch?v=' + video?.id?.videoId}
                          className="block hover:opacity-90 transition-opacity"
                        >
                            <div className={`px-3 m-6 flex srch rounded-lg hover:bg-opacity-10 ${
                              darkMode ? 'hover:bg-white' : 'hover:bg-gray-100'
                            } transition-colors`}>
                                <img className='rounded-lg w-[400px] h-[210px] ' alt='thumbnail' src={video?.snippet?.thumbnails?.medium?.url} />
                                <ul className='flex flex-col justify-start ml-5 w-96'>
                                    <li className={`s-title text-xl ${
                                      darkMode ? 'text-white' : 'text-black'
                                    }`}>{video?.snippet?.title}</li>
                                    <li className={`text-[16px] ${
                                      darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{video?.snippet?.channelTitle}</li>
                                    <li className={`text-[16px] ${
                                      darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>100 views  {(Math.abs(new Date(video?.snippet?.publishedAt) - new Date()) / (60 * 60 * 24 * 1000)).toFixed(1)} days ago</li>
                                    <li className={`desc mt-2 text-[15px] ${
                                      darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>{video?.snippet?.description}</li>
                                </ul>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>

  )
}

export default Search
