import api from "@/api/instance/authInstance";

export const getPlaceRecommendations = async (groupId: number) => {
  const response = await api.get("recommendations/places", {
    params: {
      groupId,
    },
  });

  return response.data.data;
};

export const togglePlaceLike = async (placeId: number, isLiked: boolean) => {
  const response = await api.post(`recommendations/places/${placeId}/likes`, {
    cancel: isLiked,
  });

  return response.data.data;
};
