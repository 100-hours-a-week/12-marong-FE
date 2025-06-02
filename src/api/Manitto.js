import api from "./instance/backend.jsx";

export const getManittoDetail = async ({groupId}) => {
    const response = await api.get("/manitto/detail", {
      params: {
        groupId: groupId,
      },
    });
  
    return response.data;
  };

export const getMissionStatus = async ({groupId}) => {
  const response = await api.get("/manitto/missions", {
    params: {
      groupId: groupId,
    },
  });

  return response.data;
};

export const getManitto = async ({groupId}) => {
  const response = await api.get("/manitto", {
    params: {
      groupId: groupId,
    },
  });

  return response.data;
};

export const assignMission = async ({groupId}) => {
  console.log("Assigning mission for groupId:", groupId);
  const response = await api.post("/manitto/missions/assign", null, {
    params: {
      groupId: groupId,
    },
  });

  return response.data;
};