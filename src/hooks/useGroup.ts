import { groupQueries } from "@/api/group/queries";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useMyGroup = () => {
  return useQuery({
    ...groupQueries.getMyGroup(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const usePublicGroup = () => {
  return useInfiniteQuery({
    ...groupQueries.getPublicGroup(),
  });
};
