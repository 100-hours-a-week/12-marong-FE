import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
  checkGroupName,
  checkNickname,
  createGroup,
  getAllGroupProfiles,
  getMyGroup,
  getPublicGroup,
  getUserGroupList,
  joinGroup,
  leaveGroup,
  updateUserGroupProfile,
} from "./group";
import type {
  ICreateGroupRequestDto,
  IGroupProfilesResponseDto,
  IGroupResponseDto,
  IJoinGroupRequestDto,
  IUpdateUserGroupProfileRequestDto,
  IUserGroupListResponseDto,
} from "./type";

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

  createGroup: (data: ICreateGroupRequestDto) => ({
    mutationKey: [...groupQueries.all(), "createGroup"],
    mutationFn: () => createGroup(data),
    onError: (error: any) => {
      groupQueries.onError(error, "그룹 생성 중 오류 발생");
    },
  }),

  updateUserGroupProfile: (
    groupId: number,
    data: IUpdateUserGroupProfileRequestDto
  ) => ({
    mutationKey: [...groupQueries.all(), "updateUserGroupProfile"],
    mutationFn: () => updateUserGroupProfile(groupId, data),
    onError: (error: any) => {
      groupQueries.onError(error, "그룹 정보 수정 중 오류 발생");
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

  checkGroupName: (groupName: string) => ({
    mutationKey: [...groupQueries.all(), "checkGroupName"],
    mutationFn: () => checkGroupName(groupName),
    onError: (error: any) => {
      groupQueries.onError(error, "그룹 이름 중복 확인 중 오류 발생");
    },
  }),

  getUserGroupList: (groupId: number) =>
    queryOptions<IUserGroupListResponseDto>({
      queryKey: [...groupQueries.all(), "userGroupList"],
      queryFn: () => getUserGroupList(groupId),
    }),

  getAllGroupProfiles: () =>
    queryOptions<IGroupProfilesResponseDto>({
      queryKey: [...groupQueries.all(), "allGroupProfiles"],
      queryFn: getAllGroupProfiles,
    }),

  leaveGroup: () => ({
    mutationKey: [...groupQueries.all(), "leaveGroup"],
    mutationFn: (groupId: number) => leaveGroup(groupId),
    onError: (error: any) => {
      groupQueries.onError(error, "그룹 탈퇴 중 오류 발생");
    },
  }),

  onError: (error: any, defaultMessage: string) => {
    alert(error?.response?.data?.message || defaultMessage || "오류 발생");
  },
};
