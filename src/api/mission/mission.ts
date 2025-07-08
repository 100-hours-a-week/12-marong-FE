import api from "@/api/instance/authInstance";
import type { ISelectMissionRequestDto } from "./type";

export const getAvailableMissions = async (groupId: number) => {
  const response = await api.get("/missions/available", {
    params: {
      groupId: groupId,
    },
  });

  return response.data.data;
};

export const selectMission = async (data: ISelectMissionRequestDto) => {
  const response = await api.post("/missions/select", {
    ...data,
  });

  return response.data.data;
};
