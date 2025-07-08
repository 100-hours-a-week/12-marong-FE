import { queryOptions, useMutation } from "@tanstack/react-query";
import { getAvailableMissions, selectMission } from "./mission";
import type {
  IAvailableMissionResponseDto,
  ISelectMissionRequestDto,
} from "./type";

export const missionQueries = {
  all: () => ["mission"],

  getAvailableMissions: (groupId: number) =>
    queryOptions<IAvailableMissionResponseDto>({
      queryKey: [...missionQueries.all(), "missions", groupId],
      queryFn: () => getAvailableMissions(groupId),
    }),

  selectMission: (groupId: number) => ({
    mutationKey: [...missionQueries.all(), "select", groupId],
    mutationFn: (data: ISelectMissionRequestDto) => selectMission(data),
    onError: (error: any) => {
      missionQueries.onError(error, "미션 선택에 실패했습니다.");
    },
  }),

  onError: (error: any, defaultMessage: string) => {
    alert(error?.response?.data?.message || defaultMessage || "오류 발생");
  },
};
