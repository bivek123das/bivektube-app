import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { YOUTUBE_COMMENTS_API } from '../utils/constants';
import CommentCard from './CommentCard';
import '../utils/watchpage.css';

const VideoDatas = ({vdata,vId}) => {

  const [comments,setComments] = useState([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const darkMode = useSelector((store) => store.theme.darkMode);
  const videoId = vId;
  //  console.log(vdata,vId);

  

   const apiURL = YOUTUBE_COMMENTS_API(videoId);

   const fetchCommentData = async ()=>{
          const response = await fetch(apiURL);

          const data = await response.json();
          console.log(data.items);
          setComments(data.items || []);
   }
   
   useEffect(()=>{
    fetchCommentData();
 },[vId])
   
  return (
    <div className='py-3 z-10 video-head'>
        <h1 className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
          {vdata?.snippet?.title}
        </h1>
        <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {vdata?.snippet?.channelTitle}
        </p>
        <div className={`my-2 px-1 py-2 text-xs shadow-xl rounded-xl space-y-2 ${
          darkMode ? 'bg-[#1D232A] text-gray-300' : 'bg-gray-50 text-gray-700'
        }`}>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {vdata?.statistics?.viewCount} Views <span> {new Date(vdata?.snippet?.publishedAt).toLocaleDateString()}</span>
            </p>
            {vdata?.snippet?.description && (
              <>
                <p className={`${isDescriptionExpanded ? '' : 'line-clamp-3'} ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {vdata?.snippet?.description}
                </p>
                <button
                  type='button'
                  className={`font-semibold text-xs hover:opacity-80 transition-opacity ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                >
                  {isDescriptionExpanded ? 'Show less' : 'Show more'}
                </button>
              </>
            )}
        </div>
        <p className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
          {vdata?.statistics?.commentCount} Comments
        </p>


        {/* To Diplay the Comment */}

        {
          comments.length > 0 ?(
              comments.map((comment)=>{
                return <CommentCard key={comment.id} comt={comment}/>
              })
          ):(
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              No Comments available
            </p>
          )
        }


    </div>

  )
}

export default VideoDatas;
