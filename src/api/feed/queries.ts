import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getFeeds, toggleLike } from "./feed";
import type { IFeedResponseDto, IToggleLikeDto } from "./type";

export const feedQueries = {
  all: () => ["feed"],

  getFeeds: (groupId: number) =>
    infiniteQueryOptions<IFeedResponseDto, Error>({
      queryKey: [...feedQueries.all(), "feeds", groupId],
      queryFn: ({ pageParam = 1 }) => getFeeds(groupId, pageParam as number),
      getNextPageParam: (lastPage) =>
        lastPage.totalFeeds / lastPage.pageSize + 1 > lastPage.page
          ? lastPage.page + 1
          : undefined,
      initialPageParam: 1,
    }),

  toggleLike: (groupId: number) => ({
    mutationKey: [...feedQueries.all(), groupId],
    mutationFn: ({ feedId, isLiked }: IToggleLikeDto) =>
      toggleLike(feedId, isLiked),
  }),
};
