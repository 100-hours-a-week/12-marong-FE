export interface IFeedDto {
  feedId: number;
  author: string;
  missionTitle: string;
  manitteeName: string;
  content: string;
  likes: number;
  createdAt: string;
  imageUrl: string;
  week: number;
  isLiked: boolean;
}

export interface IFeedResponseDto {
  page: number;
  pageSize: number;
  totalFeeds: number;
  groupId: number;
  groupName: string;
  feeds: IFeedDto[];
}

export interface IToggleLikeDto {
  feedId: number;
  isLiked: boolean;
}

export interface IUploadFeedRequestDto {
  groupId: number;
  missionId: number;
  content: string;
  image: File | null;
}
