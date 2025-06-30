import { infiniteQueryOptions } from "@tanstack/react-query";
import { getFeeds, toggleLike, uploadFeed } from "./feed";
import type {
  IFeedResponseDto,
  IToggleLikeDto,
  IUploadFeedRequestDto,
} from "./type";

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

  uploadFeed: () => ({
    mutationKey: [...feedQueries.all(), "uploadFeed"],
    mutationFn: (requestDto: IUploadFeedRequestDto) => uploadFeed(requestDto),
    onError: (error: any) => {
      feedQueries.onError(error, "피드 업로드 중 오류 발생");
    },
  }),

  onError: (error: any, defaultMessage: string) => {
    alert(error?.response?.data?.message || defaultMessage || "오류 발생");
  },
};
