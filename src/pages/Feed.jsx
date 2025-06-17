import { useEffect, useState, useRef, useCallback } from "react";
import api from "../api/instance/backend.jsx";
import FeedCard from "../components/FeedCard.jsx";
import { useGroup } from "../context/GroupContext.jsx";
import FloatingAddButton from "../components/FloatingAddButton.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingWheel from "../components/LoadingWheel.jsx";
import { useNavigate } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { feedQueries } from "@/api/query/FeedQueries.js";
import { manittoQueries } from "@/api/query/ManittoQueries.js";

function Feed() {
  const { selectedGroup } = useGroup();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    ...feedQueries.getFeeds(selectedGroup?.groupId),
    enabled: !!selectedGroup?.groupId,
  });

  const { data: missionStatus } = useQuery({
    ...manittoQueries.getMissionStatus(selectedGroup?.groupId),
    enabled: !!selectedGroup?.groupId,
  });

  const { mutate: toggleLike } = useMutation({
    ...feedQueries.toggleLike(selectedGroup?.groupId),
    onSuccess: (data, { feedId, isLiked }) => {
      queryClient.setQueryData(
        feedQueries.getFeeds(selectedGroup?.groupId).queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                feeds: page.data.feeds.map((feed) =>
                  feed.feedId === feedId
                    ? {
                        ...feed,
                        isLiked: !feed.isLiked,
                        likes: feed.likes + (isLiked ? -1 : 1),
                      }
                    : feed
                ),
              },
            })),
          };
        }
      );
    },
  });

  const addPost = () => {
    if (!missionStatus) return;

    const inProgress = missionStatus?.data.missions.inProgress;

    if (inProgress.length === 0) {
      alert("진행 중인 미션이 없습니다.");
      return;
    } else {
      navigate("/main/feed/create", {
        state: { mission: inProgress[0], groupId: selectedGroup?.groupId },
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full px-4">
        {data?.pages[0].data.feeds.length === 0 && (
          <div className="flex items-center justify-center flex-1">
            <div className="text-lg font-bold">아직 그룹에 피드가 없어요</div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center flex-1">
            <LoadingWheel />
          </div>
        )}

        {/* 피드 목록 */}
        <InfiniteScroll
          className="flex-1 overflow-y-auto"
          next={fetchNextPage}
          hasMore={hasNextPage}
          dataLength={
            data ? data.pages.flatMap((page) => page.data.feeds).length : 0
          }
        >
          {data?.pages.map((page) => (
            <div key={page.data.page}>
              {page.data.feeds.map((feed) => (
                <FeedCard
                  feed={feed}
                  toggleLike={toggleLike}
                  key={feed.feedId}
                />
              ))}
            </div>
          ))}
        </InfiniteScroll>
      </div>

      {/* 피드 작성 버튼 */}
      <FloatingAddButton onClick={addPost} />
    </div>
  );
}

export default Feed;
