import {useEffect, useState} from "react";
import api from "../api/axios.js";
import FeedCard from "../components/FeedCard.jsx";
import {useGroup} from "../context/GroupContext.jsx";
import FloatingAddButton from "../components/FloatingAddButton.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

function Feed() {
  const {selectedGroup} = useGroup()
  const [feeds, setFeeds] = useState([])
  const [page, setPage] = useState(1)

  const getFeeds = () => {
    api.get("feeds", {
      params: {
        page: page,
      },
    })
      .then(res => {
        console.log(res.data.data)
        const feedsWithLike = res.data.data.feeds.map((feed) => ({
          ...feed, isLiked: true
        }))

        setFeeds(feeds.concat(feedsWithLike))

        setPage(page + 1)
      })
  }

  useEffect(() => {
    console.log("Feeds: ", feeds)
  }, [feeds])

  useEffect(() => {
    getFeeds()
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
      {/* 피드 목록 */}
      <InfiniteScroll
        className="flex-1 overflow-y-auto"
        dataLength={feeds.length}
        next={getFeeds}
        hasMore={true}
        loader={<h4 className="text-center">Loading...</h4>}
      >
        {feeds.map((feed) => (
          <FeedCard feed={feed} setLike={toggleLike} key={feed.feedId}/>
        ))}
      </InfiniteScroll>

      {/*<div className="flex-1 overflow-y-auto">*/}


      {/* 피드 작성 버튼 */}
      <FloatingAddButton onClick={addPost}/>
    </div>
  )
}

export default Feed