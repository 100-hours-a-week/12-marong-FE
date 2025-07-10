import api from "@/api/instance/authInstance";

export const getHistory = async (page: number, pageSize = 20) => {
  const response = await api.get("/my-page/feeds", {
    params: {
      page,
      pageSize,
    },
  });

  return response.data.data;
};
