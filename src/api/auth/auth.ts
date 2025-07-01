import api from "@/api/instance/default";
import authApi from "@/api/instance/authInstance";

export const kakaoLogin = async (code: string) => {
  const response = await api.get("/auth/oauth/callback", {
    params: {
      code,
      provider: "kakao",
    },
  });

  return response.data.data;
};

export const getUserInfo = async () => {
  const response = await authApi.get("/auth/user");

  return response.data.data;
};
