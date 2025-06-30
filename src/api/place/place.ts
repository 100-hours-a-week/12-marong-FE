import api from "@/api/instance/authInstance";

export const getPlaceRecommendations = async (groupId: number) => {
  const response = await api.get("recommendations/places", {
    params: {
      groupId,
    },
  });

  return response.data.data;
};
