import React, { useEffect, useState } from 'react'
import { YOUTUBE_COMMENTS_API } from '../utils/constants';
import CommentCard from './CommentCard';
import '../utils/watchpage.css';

const VideoDatas = ({vdata,vId}) => {

  const [comments,setComments] = useState([]);
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
        <h1 className='font-bold'>{vdata?.snippet?.title}</h1>
        <p className='font-semibold'>{vdata?.snippet?.channelTitle}</p>
        <div className='my-2 px-1 py-2  text-xs shadow-xl rounded-xl'>
            <p>{vdata?.statistics?.viewCount} Views <span> {new Date(vdata?.snippet?.publishedAt).toLocaleDateString()}</span></p>
            <p>{vdata?.snippet?.description}</p>
        </div>
        <p className='font-bold'>{vdata?.statistics?.commentCount} Comments</p>


        {/* To Diplay the Comment */}

        {
          comments.length > 0 ?(
              comments.map((comment)=>{
                return <CommentCard key={comment.id} comt={comment}/>
              })
          ):(
            <p>No Comments available</p>
          )
        }


    </div>

  )
}

export default VideoDatas
