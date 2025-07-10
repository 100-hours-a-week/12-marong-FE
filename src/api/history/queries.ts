import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getHistory } from "./history";
import type { IHistoryResponseDto } from "./type";

export const historyQueries = {
  all: () => ["history"],

  getHistory: () =>
    infiniteQueryOptions<IHistoryResponseDto, Error>({
      queryKey: [...historyQueries.all(), "history"],
      queryFn: ({ pageParam = 1 }) => getHistory(pageParam as number),
      getNextPageParam: (lastPage) =>
        lastPage.totalFeeds / lastPage.pageSize + 1 > lastPage.page
          ? lastPage.page + 1
          : undefined,
      initialPageParam: 1,
    }),
};
