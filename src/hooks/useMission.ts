import { useQuery } from "@tanstack/react-query";
import { manittoQueries } from "@/api/manitto/queries";

export const useMissionStatus = (groupId: number) => {
  return useQuery({
    ...manittoQueries.getMissionStatus(groupId),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });
};
