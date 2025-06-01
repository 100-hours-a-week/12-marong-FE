import { queryOptions } from "@tanstack/react-query";
import { getMissionStatus } from "../Manitto.js";

export const manittoQueries = {
  all: () => ["manitto"],

  getMissionStatus: (groupId) =>
    queryOptions({
      queryKey: [...manittoQueries.all(), "missionStatus", groupId],
      queryFn: () => getMissionStatus({ groupId }),
    }),
};