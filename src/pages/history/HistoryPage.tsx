import { useInfiniteQuery } from "@tanstack/react-query";
import { historyQueries } from "@/api/history/queries";
import { useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import HistoryCard from "@/components/pages/history/HistoryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingWheel from "@/components/common/LoadingWheel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HistoryPage() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(historyQueries.getHistory());

  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Label className="text-xl font-bold">나의 MBTI 기록</Label>

      {!isLoading &&
        (!data || data.pages.flatMap((page) => page.posts).length === 0) && (
          <div className="text-center flex-1 py-10 text-lg font-semibold flex flex-col items-center gap-4 justify-center">
            아직 작성된 게시글이 없습니다.
            <br />첫 번째 기록을 남겨보세요!
            <Button
              size="lg"
              className="mt-4 border-brown-500"
              onClick={() => {
                navigate("/home");
              }}
            >
              피드 작성하러 가기
            </Button>
          </div>
        )}

      <InfiniteScroll
        className="space-y-4 select-none"
        style={{
          overflow: "hidden",
        }}
        next={fetchNextPage}
        hasMore={hasNextPage}
        dataLength={data ? data.pages.flatMap((page) => page.posts).length : 0}
        loader={
          <div className="flex flex-1 justify-center items-center">
            <LoadingWheel />
          </div>
        }
      >
        {data?.pages
          .flatMap((page) => page.posts)
          .map((post, index) => (
            <HistoryCard
              key={post.feedId}
              post={post}
              hasNextPost={index < data?.pages[0].totalFeeds - 1}
            />
          ))}
      </InfiniteScroll>
    </div>
  );
}

export default HistoryPage;
