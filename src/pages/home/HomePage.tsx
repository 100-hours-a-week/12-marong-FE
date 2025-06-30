import { feedQueries } from "@/api/feed/queries";
import LoadingWheel from "@/components/common/LoadingWheel";
import { useGroupStore } from "@/hooks/useGroupContext";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import type { IFeedDto } from "@/api/feed/type";
import FeedCard from "@/components/pages/feed/FeedCard";
import { useNavigate } from "react-router-dom";
import FloatingButton from "@/components/common/FloatingAddButton";
import { useMissionStatus } from "@/hooks/useMission";
import { Plus } from "lucide-react";

function HomePage() {
  const { selectedGroup } = useGroupStore();
  const navigate = useNavigate();

  if (!selectedGroup) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="text-xl font-bold text-brown-dark">
          그룹에 가입하고 서비스를 이용해보세요!
        </div>
      </div>
    );
  }

  const queryClient = useQueryClient();
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    ...feedQueries.getFeeds(selectedGroup.groupId),
  });

  const { data: missionStatus } = useMissionStatus(selectedGroup.groupId);

  const { mutate: toggleLike } = useMutation({
    ...feedQueries.toggleLike(selectedGroup.groupId),
    onSuccess: (data, { feedId, isLiked }) => {
      queryClient.setQueryData(
        feedQueries.getFeeds(selectedGroup?.groupId).queryKey,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              feeds: page.feeds.map((feed) =>
                feed.feedId === feedId
                  ? {
                      ...feed,
                      isLiked: !feed.isLiked,
                      likes: feed.likes + (isLiked ? -1 : 1),
                    }
                  : feed
              ),
            })),
          };
        }
      );
    },
  });

  const addPost = () => {
    if (!missionStatus) {
      alert("마니또 매칭 정보가 없습니다.");
      return;
    }

    const inProgress = missionStatus.missions.inProgress;

    if (inProgress.length === 0) {
      alert("진행 중인 미션이 없습니다.");
      return;
    } else {
      navigate("/home/feed/create", {
        state: { mission: inProgress[0], groupId: selectedGroup?.groupId },
      });
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 px-4">
        {data?.pages[0].totalFeeds === 0 && (
          <div className="flex flex-1 justify-center items-center text-lg font-bold text-center">
            아직 그룹에 피드가 없어요
          </div>
        )}

        {isLoading && (
          <div className="flex flex-1 justify-center items-center">
            <LoadingWheel />
          </div>
        )}

        <InfiniteScroll
          className="overflow-y-auto flex-1"
          next={fetchNextPage}
          hasMore={hasNextPage}
          dataLength={
            data ? data.pages.flatMap((page) => page.feeds).length : 0
          }
          loader={
            <div className="flex flex-1 justify-center items-center">
              <LoadingWheel />
            </div>
          }
        >
          {data?.pages
            .flatMap((page) => page.feeds)
            .map((feed: IFeedDto) => (
              <FeedCard key={feed.feedId} feed={feed} toggleLike={toggleLike} />
            ))}
        </InfiniteScroll>
      </div>

      <FloatingButton onClick={addPost}>
        <Plus />
      </FloatingButton>
    </div>
  );
}

export default HomePage;
