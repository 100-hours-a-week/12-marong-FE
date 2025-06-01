import api from "./instance/backend.jsx"

export const getMyGroups = async () => {
  const response = await api.get("/groups/me");

  return response.data;
}

export const joinGroup = async (groupId, inviteCode, nickname, groupUserProfileImage) => {
  const formData = new FormData();
  formData.append("inviteCode", inviteCode);
  formData.append("groupUserNickname", nickname);
  if (groupUserProfileImage) {
    formData.append("groupUserProfileImage", groupUserProfileImage);
  }

  const response = await api.post(`/groups/${groupId}/join`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const checkNickname = async (groupId, nickname) => {
  const response = await api.get(`/groups/${groupId}/nickname/check`, {
    params: {
      nickname,
    },
  });

  return response.data;
}

export const getAllPublicGroups = async (page) => {
  const response = await api.get("/groups/public", {
    params: {
      page: page,
    },
  });

  return response.data;
}

export const checkNicknameStatus = async (groupId) => {
  const response = await api.get(`/groups/${groupId}/nickname/status`);

  return response.data;
}

export const updateGroupProfile = async (groupId, nickname, groupProfileImage) => {
  const formData = new FormData();
  formData.append("groupUserNickname", nickname);
  if (groupProfileImage) {
    formData.append("groupUserProfileImage", groupProfileImage);
  }

  const response = await api.put(`/groups/${groupId}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const createGroup = async (groupName, description, inviteCode, groupImage, groupUserNickname, groupUserProfileImage) => {
  const formData = new FormData();
  formData.append("groupName", groupName);
  formData.append("description", description);
  formData.append("inviteCode", inviteCode);
  if (groupImage) {
    formData.append("groupImage", groupImage);
  }
  formData.append("groupUserNickname", groupUserNickname);
  if (groupUserProfileImage) {
    formData.append("groupUserProfileImage", groupUserProfileImage);
  }

  const response = await api.post("/groups", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}