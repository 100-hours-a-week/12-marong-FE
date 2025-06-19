import type { NavigateFunction } from "react-router-dom";
import { kakaoLogin } from "./auth";
import type { IKakaoLoginResponse } from "./type";

export const authQueries = {
  all: () => ["auth"],

  kakaoLogin: ({ navigate }: { navigate: NavigateFunction }) => ({
    mutationKey: [...authQueries.all(), "kakaoLogin"],
    mutationFn: (code: string) => kakaoLogin(code),
    onSuccess: (data: IKakaoLoginResponse) => {
      localStorage.setItem("accessToken", data.jwt);
      localStorage.setItem("refreshToken", data.refreshToken);

      console.log(data);

      if (data.user.hasCompletedSurvey) {
        navigate("/survey");
      } else {
        navigate("/home");
      }
    },
    onError: (error: Error) => {
      console.error("Login Error:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  }),
};
