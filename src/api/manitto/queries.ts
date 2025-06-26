import { queryOptions } from "@tanstack/react-query";
import { getMissionStatus } from "./manitto";

export const manittoQueries = {
  all: () => ["manitto"],

  getMissionStatus: (groupId: number) =>
    queryOptions({
      queryKey: [...manittoQueries.all(), "missions", groupId],
      queryFn: () => getMissionStatus(groupId),
    }),
};
