import api from "../instance/authInstance";

export const getFeeds = async (groupId: number, page: number) => {
  const response = await api.get("/feeds", {
    params: {
      groupId: groupId,
      page: page,
    },
  });

  return response.data.data;
};

export const toggleLike = async (feedId: number, isLiked: boolean) => {
  console.log(feedId, isLiked);
  const response = await api.post(`/feeds/${feedId}/likes`, {
    cancel: isLiked,
  });

  return response.data.data;
};
