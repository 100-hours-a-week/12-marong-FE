"use client";

import api from "../api/instance/backend.jsx";
import { IoIosMore } from "react-icons/io";
import ElapsedTimeText from "./ElapsedTimeText.jsx";
import defaultProfile from "../assets/default_profile.png";
import { useEffect } from "react";

function FeedCard({ feed, toggleLike }) {
  return (
    <div className="flex flex-col border-b">
      {/* 게시물 헤더 */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3 py-2">
          <img
            src={defaultProfile}
            alt="프로필 이미지"
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold">
              {feed.author} -> {feed.manitteeName}
            </h3>
            <p className="text-xs text-gray-500">{feed.missionTitle}</p>
          </div>
        </div>

        <IoIosMore size={24} />
      </div>

      {/* 게시물 이미지 */}
      <div className="flex justify-start">
        {feed.imageUrl !== null && (
          <img
            src={feed.imageUrl}
            alt="Feed"
            className="w-full h-auto rounded-lg"
          />
        )}
      </div>

      {/* 게시물 내용 */}
      <div className="flex justify-between pt-4 pb-2 ps-2">
        <div className="flex flex-col gap-1 pe-4">
          {/*<p className="text-xs font-bold text-start">{feed.author}</p>*/}
          <p className="text-xs text-gray-700 text-start break-keep">
            {feed.content}
          </p>
        </div>

        <div className="items-center ps-4 pe-2">
          {/* 좋아요 아이콘 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={feed.isLiked ? "#FF6B6B" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            onClick={() => {
              toggleLike({ feedId: feed.feedId, isLiked: feed.isLiked });
            }}
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <div className="text-xs text-">{feed.likes}</div>
        </div>
      </div>

      {/* 게시글 생성 일자 */}
      <ElapsedTimeText
        className="px-2 pb-4 text-xs text-gray-500 text-start"
        createdDate={feed.createdAt}
      />
    </div>
  );
}

export default FeedCard;
