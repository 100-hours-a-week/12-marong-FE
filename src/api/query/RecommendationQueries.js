import { queryOptions } from "@tanstack/react-query";
import { getPlaceRecommendations } from "../Recommendation.js";

export const recommendationQueries = {
  all: () => ["recommendation"],

  getPlaceRecommendations: (groupId) =>
    queryOptions({
      queryKey: [...recommendationQueries.all(), "placeRecommendations", groupId],
      queryFn: () => getPlaceRecommendations({ groupId }),
    }),
};