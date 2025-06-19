import api from "@/api/instance/default";

export const kakaoLogin = async (code: string) => {
  const response = await api.get("/auth/oauth/callback", {
    params: {
      code,
      provider: "kakao",
    },
  });

  return response.data.data;
};
