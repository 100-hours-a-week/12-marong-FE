import { queryOptions } from "@tanstack/react-query";
import {
  assignNewMission,
  getManittoDetail,
  getMissionStatus,
} from "./manitto";
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

  assignNewMission: (groupId: number) => ({
    mutationKey: [...manittoQueries.all(), "missions", groupId],
    mutationFn: () => assignNewMission(groupId),
    onError: (error: any) => {
      manittoQueries.onError(error, "미션 할당에 실패했습니다.");
    },
  }),

  onError: (error: any, defaultMessage: string) => {
    alert(error?.response?.data?.message || defaultMessage || "오류 발생");
  },
};
