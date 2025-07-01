import type { NavigateFunction } from "react-router-dom";
import { getSurvey, saveSurvey, updateSurvey } from "./survey";
import type { ISurveyRequest, ISurveyResponse } from "./type";
import { queryOptions } from "@tanstack/react-query";

export const surveyQueries = {
  all: () => ["survey"],

  saveSurvey: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...surveyQueries.all(), "saveSurvey"],
    mutationFn: (data: ISurveyRequest) => saveSurvey(data),
    onSuccess: () => {
      localStorage.setItem("hasCompletedSurvey", "true");
      navigate("/home");
    },
    onError: (error: any) => {
      surveyQueries.onError(error, "설문 저장에 실패했습니다.");
    },
  }),

  updateSurvey: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...surveyQueries.all(), "updateSurvey"],
    mutationFn: (data: ISurveyRequest) => updateSurvey(data),
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error: any) => {
      surveyQueries.onError(error, "설문 수정에 실패했습니다.");
    },
  }),

  getSurvey: () =>
    queryOptions<ISurveyResponse>({
      queryKey: [...surveyQueries.all(), "getSurvey"],
      queryFn: getSurvey,
    }),

  onError: (error: any, defaultMessage: string) => {
    alert(error?.response?.data?.message || defaultMessage || "오류 발생");
  },
};
