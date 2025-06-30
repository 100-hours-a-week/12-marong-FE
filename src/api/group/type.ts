export interface IGroupResponseDto {
  groupId: number;
  groupName: string;
  description: string;
  groupImageUrl: string;
  memberCount: number;
  myNickname: string;
  myProfileImageUrl: string;
  isOwner: boolean;
  joinedAt: string;
}

export interface IJoinGroupRequestDto {
  inviteCode: string;
  groupUserNickname: string;
  groupUserProfileImage: File | null;
}

export interface ICreateGroupRequestDto {
  groupName: string;
  description: string;
  inviteCode: string;
  groupImage: File | null;
  groupUserNickname: string;
  groupUserProfileImage: File | null;
}

export interface IUpdateUserGroupProfileRequestDto {
  groupUserNickname: string;
  groupUserProfileImage: File | null;
}

export interface IUserGroupListResponseDto {
  nicknames: string[];
  count: number;
}
