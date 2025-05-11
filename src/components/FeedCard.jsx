"use client"

import api from "../api/axios.js"
import Divider from "./Divider.jsx";

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
      <div className="flex items-center px-2 py-2 gap-4">
        <img
          src="https://placehold.co/600/pink/white"
          alt="프로필 이미지"
          className="w-12 h-12 rounded-full"
        />

        <div className="flex flex-col gap-1 items-start">
          <h3 className="text-lg font-bold font-marong">{feed.manittoName}</h3>
          <p className="text-gray-500 font-marong">{feed.missionTitle}</p>
        </div>
      </div>

      <Divider />

      {/* 게시물 이미지 */}
      <div className="flex justify-start mt-2">
        {/*<img src={feed.imageUrl} alt="Feed" className="w-full h-auto rounded-lg"/>*/}
        <img src="https://placehold.co/600" alt="Feed" className="w-full h-auto rounded-lg"/>
      </div>

      {/* 게시물 내용 */}
      <div className="flex justify-between px-4 py-4">
        <div className="flex flex-col gap-2">
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