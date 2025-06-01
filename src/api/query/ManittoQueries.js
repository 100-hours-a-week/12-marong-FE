import { queryOptions } from "@tanstack/react-query";
import { getManittoDetail, getMissionStatus, getManitto, assignMission } from "../Manitto.js";

export const manittoQueries = {
  all: () => ["manitto"],

  getManittoDetail: (groupId) =>
    queryOptions({
      queryKey: [...manittoQueries.all(), "manittoDetail", groupId],
      queryFn: () => getManittoDetail({ groupId }),
    }),

  getMissionStatus: (groupId) =>
    queryOptions({
      queryKey: [...manittoQueries.all(), "missionStatus", groupId],
      queryFn: () => getMissionStatus({ groupId }),
    }),

  getManitto: (groupId) =>
    queryOptions({
      queryKey: [...manittoQueries.all(), "manitto", groupId],
      queryFn: () => getManitto({ groupId }),
    }),

  assignMission: (groupId) =>
    queryOptions({
      mutationKey: [...manittoQueries.all(), "assignMission", groupId],
      mutationFn: () => assignMission({ groupId }),
      onError: (error) => {
        console.log("Error: ", error);
        alert(error.response.data.message);
      },
    }),
};