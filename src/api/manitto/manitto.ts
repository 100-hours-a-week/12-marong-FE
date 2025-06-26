import api from "../instance/authInstance";

export const getMissionStatus = async (groupId: number) => {
  const response = await api.get("/manitto/missions", {
    params: {
      groupId: groupId,
    },
  });

  return response.data.data;
};
