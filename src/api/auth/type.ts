export interface IUserResponseDto {
  userId: number;
  kakaoName: string;
  profileImage: string;
  hasCompletedSurvey: boolean;
  hasKakaotechGroupNickname: boolean;
}

export interface IKakaoLoginResponse {
  jwt: string;
  refreshToken: string;
  isNewUser: boolean;
  user: IUserResponseDto;
}
