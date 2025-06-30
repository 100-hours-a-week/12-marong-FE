export interface IRevealedManittoDto {
  name: string;
  groupNickname: string;
  groupProfileImage: string;
  anonymousName: string;
}

export interface IPreviousCycleManittoDto {
  name: string;
  groupNickname: string;
  groupProfileImage: string;
  anonymousName: string;
}

export interface ICurrentManittoDto {
  anonymousName: string;
}

export interface ICurrentManitteeDto {
  name: string;
  groupNickname: string;
  groupProfileImage: string;
}

export interface IManittoDetailResponseDto {
  period: string;
  remainingTime: string;
  groupId: number;
  groupName: string;
  isNewUser: boolean;

  revealedManitto: IRevealedManittoDto;
  previousCycleManitto: IPreviousCycleManittoDto;
  currentManitto: ICurrentManittoDto;
  currentManittee: ICurrentManitteeDto;
}

export interface IMissionDto {
  missionId: number;
  title: string;
  description: string;
  difficulty: string;
}

export interface IMissionStatusResponseDto {
  progress: {
    completed: number;
    incomplete: number;
    total: number;
  };
  missions: {
    inProgress: IMissionDto[];
    completed: IMissionDto[];
    incomplete: IMissionDto[];
  };
}
