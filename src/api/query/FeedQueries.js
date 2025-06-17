import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";
import { getFeeds, toggleLike, uploadFeed } from "@/api/Feed.js";

export const feedQueries = {
  all: () => ["feeds"],

  getFeeds: (groupId) =>
    infiniteQueryOptions({
      queryKey: [...feedQueries.all(), groupId],
      queryFn: ({pageParam}) => getFeeds(groupId, pageParam),
      getNextPageParam: (lastPage) => {
        const totalPage = Math.ceil(lastPage.data.totalFeeds / lastPage.data.pageSize);

        return lastPage.data.page < totalPage ? lastPage.data.page + 1 : undefined;
      },
      initialPageParam: 1,
    }),

  toggleLike: (groupId) =>
    queryOptions({
      mutationKey: [...feedQueries.all(), groupId],
      mutationFn: ({feedId, isLiked}) => toggleLike({feedId, isLiked}),
    }),

  uploadFeed: (groupId) =>
    queryOptions({
      mutationKey: [...feedQueries.all(), groupId],
      mutationFn: ({missionId, content, image}) => uploadFeed({groupId, missionId, content, image}),
      onSuccess: (data, { missionId, content, image }) => {
        console.log("피드 등록 성공:", data);
        window.location.href = "/main/home";
      },
      onError: (error) => {
        console.error("피드 등록 실패:", error);
        alert(error.response.data.message);
      },
    }),
};