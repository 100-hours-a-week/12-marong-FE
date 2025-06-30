import api from "../instance/authInstance";

export const getManittoDetail = async (groupId: number) => {
  const response = await api.get("/manitto/detail", {
    params: {
      groupId: groupId,
    },
  });

  return response.data.data;
};

export const getMissionStatus = async (groupId: number) => {
  const response = await api.get("/manitto/missions", {
    params: {
      groupId: groupId,
    },
  });

  return response.data.data;
};

export const assignNewMission = async (groupId: number) => {
  const response = await api.post("/manitto/missions/assign", null, {
    params: {
      groupId: groupId,
    },
  });

  return response.data.data;
};
