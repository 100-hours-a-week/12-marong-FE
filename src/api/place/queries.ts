import { queryOptions } from "@tanstack/react-query";
import { getPlaceRecommendations } from "./place";
import type { IPlaceRecommendationResponse } from "./type";

export const placeQueries = {
  all: () => ["place"],

  getPlaceRecommendations: (groupId: number) =>
    queryOptions<IPlaceRecommendationResponse>({
      queryKey: [...placeQueries.all(), "getPlaceRecommendations", groupId],
      queryFn: () => getPlaceRecommendations(groupId),
    }),
};
