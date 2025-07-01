import api from "@/api/instance/authInstance";
import type { ISurveyRequest } from "./type";

export const saveSurvey = async (data: ISurveyRequest) => {
  const response = await api.post("/survey", data);

  return response.data;
};

export const getSurvey = async () => {
  const response = await api.get("/survey");

  return response.data.data;
};
