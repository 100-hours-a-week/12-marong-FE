import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query"
import {getMyGroups, checkNickname, joinGroup, getAllPublicGroups, checkNicknameStatus, updateGroupProfile, createGroup} from "@/api/Group.js"

export const GroupQueries = {
  all: () => ["group"],

  myGroups: () => ({
      mutationKey: [...GroupQueries.all(), "myGroups"],
      mutationFn: () => getMyGroups(),
    }),

  joinGroup: ({groupId, inviteCode, nickname, groupUserProfileImage}) => ({
      mutationKey: [...GroupQueries.all(), "joinGroup", groupId],
      mutationFn: () => joinGroup(groupId, inviteCode, nickname, groupUserProfileImage),
    }),

  checkNickname: ({groupId, nickname}) => ({
      mutationKey: [...GroupQueries.all(), "checkNickname", groupId],
      mutationFn: () => checkNickname(groupId, nickname),
      
    }),

  getAllPublicGroups: () => infiniteQueryOptions({
    queryKey: [...GroupQueries.all(), "getAllPublicGroups"],
    queryFn: ({pageParam = 1}) => getAllPublicGroups(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.data.isLast ? undefined : lastPage.data.currentPage + 1,
    initialPageParam: 1,
  }),

  checkNicknameStatus: ({groupId}) => ({
    queryKey: [...GroupQueries.all(), "checkNicknameStatus", groupId],
    queryFn: () => checkNicknameStatus(groupId),
  }),

  updateGroupProfile: ({groupId, nickname, groupProfileImage}) => ({
    mutationKey: [...GroupQueries.all(), "updateGroupProfile", groupId],
    mutationFn: () => updateGroupProfile(groupId, nickname, groupProfileImage),
  }),

  createGroup: ({groupName, description, inviteCode, groupImage, groupUserNickname, groupUserProfileImage}) => ({
    mutationKey: [...GroupQueries.all(), "createGroup"],
    mutationFn: () => createGroup(groupName, description, inviteCode, groupImage, groupUserNickname, groupUserProfileImage),
  }),
}