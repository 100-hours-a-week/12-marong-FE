import type { NavigateFunction } from "react-router-dom";
import { saveSurvey } from "./survey";
import type { ISurveyRequest } from "./type";

export const surveyQueries = {
  all: () => ["survey"],

  saveSurvey: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...surveyQueries.all(), "saveSurvey"],
    mutationFn: (data: ISurveyRequest) => saveSurvey(data),
    onSuccess: () => {
      localStorage.setItem("hasCompletedSurvey", "true");
      navigate("/home");
    },
    onError: (error: Error) => {
      console.error("Save Survey Error:", error);
      alert("설문 저장에 실패했습니다. 다시 시도해주세요.");
    },
  }),
};
