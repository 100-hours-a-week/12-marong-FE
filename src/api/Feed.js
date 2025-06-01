import api from "@/api/instance/backend.jsx";

export const getFeeds = async (groupId, page) => {
  const response = await api.get("feeds", {
    params: {
      groupId: groupId,
      page: page,
    },
  });

  return response.data;
};

export const toggleLike = async ({feedId, isLiked}) => {
  const response = await api.post(`/feeds/${feedId}/likes`, {
    cancel: isLiked,
  });

  return response.data;
};

export const uploadFeed = async ({groupId, missionId, content, image}) => {
  const formData = new FormData();
  formData.append("groupId", groupId);
  formData.append("missionId", missionId);
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("feeds", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};