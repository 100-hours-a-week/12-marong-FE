export interface ISelectMissionRequestDto {
  missionId: number;
  groupId: number;
}

export interface IAvailableMissionDto {
  missionId: number;
  title: string;
  description: string;
  difficulty: string;
  currentSelections: number;
  maxSelections: number;
  remainingSelections: number;
  alreadySelectedInWeek: boolean;
  selectable: boolean;
}

export interface IMissionSelectionStatus {
  missionId: number;
  title: string;
  description: string;
  difficulty: string;
  selectedAt: string;
}

export interface IAvailableMissionResponseDto {
  groupId: number;
  groupName: string;
  date: string;
  canSelectToday: boolean;
  todaySelection: IMissionSelectionStatus;
  availableMissions: IAvailableMissionDto[];
}
