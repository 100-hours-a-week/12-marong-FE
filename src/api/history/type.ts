export interface IMbtiUpdateInfo {
  changedMbtiType: string;
  changeReason: string;
  previousScore: number;
  currentScore: number;
  updatedAt: string;
  eiScore: number;
  snScore: number;
  tfScore: number;
  jpScore: number;
}

export interface IPostInfo {
  feedId: number;
  anonymousAuthorName: string;
  authorProfileImageUrl: string;
  groupName: string;
  missionTitle: string;
  manitteeName: string;
  content: string;
  likes: number;
  createdAt: string;
  imageUrl: string;
  week: number;
  liked: boolean;
  mbtiUpdate: IMbtiUpdateInfo;
}

interface IGroupInfo {
  groupId: number;
  groupName: string;
  groupImageUrl: string;
  postCount: number;
}

export interface IHistoryResponseDto {
  page: number;
  pageSize: number;
  totalFeeds: number;
  groupInfo: IGroupInfo;
  posts: IPostInfo[];
}
