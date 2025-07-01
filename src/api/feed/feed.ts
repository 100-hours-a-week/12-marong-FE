import api from "../instance/authInstance";
import type { IUploadFeedRequestDto } from "./type";

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
  const response = await api.post(`/feeds/${feedId}/likes`, {
    cancel: isLiked,
  });

  return response.data.data;
};

export const uploadFeed = async ({
  groupId,
  missionId,
  content,
  image,
}: IUploadFeedRequestDto) => {
  const formData = new FormData();
  formData.append("groupId", groupId.toString());
  formData.append("missionId", missionId.toString());
  formData.append("content", content);
  if (image) {
    formData.append("image", image);
  }

  const response = await api.post(`/feeds`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};
