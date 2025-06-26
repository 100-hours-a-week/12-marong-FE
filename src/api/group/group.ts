import api from "@/api/instance/authInstance";
import type {
  ICreateGroupRequestDto,
  IJoinGroupRequestDto,
  IUpdateUserGroupProfileRequestDto,
} from "./type";

export const getMyGroup = async () => {
  const response = await api.get("/groups/me");

  return response.data.data;
};

export const getPublicGroup = async (page: number) => {
  const response = await api.get("/groups/public", {
    params: {
      page: page,
      pageSize: 10,
    },
  });

  return response.data.data;
};

export const joinGroup = async (
  groupId: number,
  data: IJoinGroupRequestDto
) => {
  const formData = new FormData();
  formData.append("inviteCode", data.inviteCode);
  formData.append("groupUserNickname", data.groupUserNickname);
  if (data.groupUserProfileImage) {
    formData.append("groupUserProfileImage", data.groupUserProfileImage);
  }

  const response = await api.post(`/groups/${groupId}/join`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const checkNickname = async (groupId: number, nickname: string) => {
  const response = await api.get(`/groups/${groupId}/nickname/check`, {
    params: {
      nickname: nickname,
    },
  });

  return response.data.data;
};

export const checkGroupName = async (groupName: string) => {
  const response = await api.get(`/groups/name/check`, {
    params: {
      groupName: groupName,
    },
  });

  return response.data.data;
};

export const createGroup = async (data: ICreateGroupRequestDto) => {
  const formData = new FormData();
  formData.append("groupName", data.groupName);
  formData.append("description", data.description);
  formData.append("inviteCode", data.inviteCode);
  formData.append("groupUserNickname", data.groupUserNickname);
  if (data.groupImage) {
    formData.append("groupImage", data.groupImage);
  }
  if (data.groupUserProfileImage) {
    formData.append("groupUserProfileImage", data.groupUserProfileImage);
  }

  const response = await api.post("/groups", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const updateUserGroupProfile = async (
  groupId: number,
  data: IUpdateUserGroupProfileRequestDto
) => {
  const formData = new FormData();
  formData.append("groupUserNickname", data.groupUserNickname);
  if (data.groupUserProfileImage) {
    formData.append("groupUserProfileImage", data.groupUserProfileImage);
  }

  const response = await api.put(`/groups/${groupId}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};

export const getUserGroupList = async (groupId: number) => {
  const response = await api.get(`/groups/${groupId}/nicknames`);

  return response.data.data;
};
