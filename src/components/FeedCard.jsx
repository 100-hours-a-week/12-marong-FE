"use client"

import api from "../api/backend.jsx"
import {IoIosMore} from "react-icons/io";
import joy from "../assets/joy.jpg"

function FeedCard({feed, setLike}) {

  function toggleLike() {
    api.post(`/feeds/${feed.feedId}/likes`, {
      cancel: true
    })
      .then(res => {
        console.log(res.data)
        setLike(feed.feedId)
      })
      .catch(err => {
        console.log("Error:", err)
      })
  }

  return (
    <div className="flex flex-col border-b max-w-xl">
      {/* 게시물 헤더 */}
      <div className="flex flex-row justify-between items-center ">
        <div className="flex items-center px-2 py-2 gap-3">
          <img
            src={joy}
            alt="프로필 이미지"
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col items-start">
            <h3 className="font-bold font-marong">{feed.manittoName}</h3>
            <p className="text-sm text-gray-500 font-marong">{feed.missionTitle}</p>
          </div>
        </div>

        <IoIosMore size={24}/>
      </div>

      {/* 게시물 이미지 */}
      <div className="flex justify-start">
        {/*<img src={feed.imageUrl} alt="Feed" className="w-full h-auto rounded-lg"/>*/}
        <img src={feed.imageUrl} alt="Feed" className="w-full h-auto rounded-lg"/>
      </div>

      {/* 게시물 내용 */}
      <div className="flex justify-between px-4 pt-4 pb-2">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-start">{feed.author}</p>
          <p className="text-sm text-gray-700 text-start">{feed.content}</p>
        </div>

        <div className="ps-4">
          {/* 좋아요 아이콘 */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor"
               fill={feed.isLiked ? "red" : "none"}
               onClick={toggleLike}
               className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
          </svg>
        </div>
      </div>

      {/* 게시글 생성 일자 */}
      <p className="text-xs text-gray-500 px-4 pb-4 text-start">{feed.createdAt}</p>

    </div>
  )
}

export default FeedCard