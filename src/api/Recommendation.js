import api from "./instance/backend.jsx";

export const getPlaceRecommendations = async ({groupId}) => {
  const response = await api.get("/recommendations/places", {
    params: {
      groupId: groupId,
    },
  });

  return response.data;
};