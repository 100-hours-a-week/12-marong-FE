import {useEffect, useState} from "react";
import FeedHeader from "../components/FeedHeader.jsx";
import api from "../api/axios.js";
import FeedCard from "../components/FeedCard.jsx";

function Feed() {
  const [groups, setGroups] = useState([
    "그룹1", "그룹2", "그룹3", "그룹4", "그룹5", "그룹6", "그룹7", "그룹8", "그룹9", "그룹10"
  ])

  const [selectedGroup, setSelectedGroup] = useState("카카오테크 부트캠프")
  const [feeds, setFeeds] = useState([])

  useEffect(() => {
    console.log("Feeds: ", feeds)
  }, [feeds])

  useEffect(() => {
    api.get("feeds")
      .then(res => {
        console.log(res.data.data)
        const feedsWithLike = res.data.data.feeds.map((feed) => ({
          ...feed, isLiked: true
        }))

        setFeeds(feedsWithLike)
      })
  }, [])

  const toggleLike = (feedId) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((feed) =>
        feed.id === feedId ? {...feed, isLiked: true} : feed
      )
    )
  }

  const addPost = () => {
    api.post("feeds", {
      missionId: 1,
      manittoName: "마니또 1",
      content: "피드 추가 테스트 내용",
    }, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log("Error:", err)
      })
  }

  return (
    <div className="flex flex-col px-4">
      {/* 헤더 */}
      <FeedHeader selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>

      {/* 피드 목록 */}
      <div className="flex-1 overflow-y-auto">
        {feeds.map((feed) => (
          <FeedCard feed={feed} setLike={toggleLike} key={feed.feedId}/>
        ))}
      </div>

      {/* 피드 작성 버튼 */}
      <div className="fixed w-full max-w-sm bottom-0 z-30 mb-16">
        <div className="flex justify-end p-6">
          <button
            className="bg-brand-pink text-white rounded-full shadow-lg h-12 w-12 text-2xl"
            onClick={() => addPost()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default Feed