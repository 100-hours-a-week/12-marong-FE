import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { checkNickname, getMyGroup, getPublicGroup, joinGroup } from "./group";
import type { IGroupResponseDto, IJoinGroupRequestDto } from "./type";

export const groupQueries = {
  all: () => ["group"],

  getMyGroup: () =>
    queryOptions<IGroupResponseDto[]>({
      queryKey: [...groupQueries.all(), "myGroup"],
      queryFn: getMyGroup,
    }),

  getPublicGroup: () =>
    infiniteQueryOptions({
      queryKey: [...groupQueries.all(), "publicGroup"],
      queryFn: ({ pageParam = 1 }) => getPublicGroup(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.isLast ? undefined : lastPage.currentPage + 1,
      initialPageParam: 1,
    }),

  joinGroup: (groupId: number, data: IJoinGroupRequestDto) => ({
    mutationKey: [...groupQueries.all(), "joinGroup"],
    mutationFn: () => joinGroup(groupId, data),
    onError: (error: any) => {
      groupQueries.onError(error, "그룹 가입 중 오류 발생");
    },
  }),

  checkNickname: ({
    groupId,
    nickname,
  }: {
    groupId: number;
    nickname: string;
  }) => ({
    mutationKey: [...groupQueries.all(), "checkNickname"],
    mutationFn: () => checkNickname(groupId, nickname),
    onError: (error: any) => {
      groupQueries.onError(error, "닉네임 중복 확인 중 오류 발생");
    },
  }),

  onError: (error: any, defaultMessage: string) => {
    alert(error?.response?.data?.message || defaultMessage || "오류 발생");
  },
};
