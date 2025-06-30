import { queryOptions } from "@tanstack/react-query";
import { getManittoDetail, getMissionStatus } from "./manitto";
import type {
  IManittoDetailResponseDto,
  IMissionStatusResponseDto,
} from "./type";

export const manittoQueries = {
  all: () => ["manitto"],

  getManittoDetail: (groupId: number) =>
    queryOptions<IManittoDetailResponseDto>({
      queryKey: [...manittoQueries.all(), "detail", groupId],
      queryFn: () => getManittoDetail(groupId),
    }),

  getMissionStatus: (groupId: number) =>
    queryOptions<IMissionStatusResponseDto>({
      queryKey: [...manittoQueries.all(), "missions", groupId],
      queryFn: () => getMissionStatus(groupId),
    }),
};
