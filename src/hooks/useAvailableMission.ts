import { missionQueries } from "@/api/mission/queries";
import { useQuery } from "@tanstack/react-query";

export const useAvailableMission = (groupId: number) => {
  return useQuery({
    ...missionQueries.getAvailableMissions(groupId),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // refetchInterval: 60 * 1000,
  });
};
