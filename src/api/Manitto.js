import api from "./instance/backend.jsx";

export const getMissionStatus = async ({groupId}) => {
  const response = await api.get("/manitto/missions", {
    params: {
      groupId: groupId,
    },
  });

  return response.data;
};