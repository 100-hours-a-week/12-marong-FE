import type { NavigateFunction } from "react-router-dom";
import { getUserInfo, kakaoLogin } from "./auth";
import type { IKakaoLoginResponse, IUserInfo } from "./type";
import { queryOptions } from "@tanstack/react-query";

export const authQueries = {
  all: () => ["auth"],

  kakaoLogin: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...authQueries.all(), "kakaoLogin"],
    mutationFn: (code: string) => kakaoLogin(code),
    onSuccess: (data: IKakaoLoginResponse) => {
      localStorage.setItem("accessToken", data.jwt);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem(
        "hasCompletedSurvey",
        data.user.hasCompletedSurvey.toString()
      );

      if (!data.user.hasCompletedSurvey) {
        navigate("/survey", { state: { fromAuth: true } });
      } else {
        navigate("/home");
      }
    },
    onError: (error: Error) => {
      console.error("Login Error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  }),

  getUserInfo: () =>
    queryOptions<IUserInfo>({
      queryKey: [...authQueries.all(), "getUserInfo"],
      queryFn: getUserInfo,
    }),
};
