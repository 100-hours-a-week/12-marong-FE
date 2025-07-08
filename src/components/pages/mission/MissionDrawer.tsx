import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { IAvailableMissionDto } from "@/api/mission/type";
import MissionCard from "@/components/pages/mission/MissionCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAvailableMission } from "@/hooks/useAvailableMission";
import { missionQueries } from "@/api/mission/queries";
import { useMutation } from "@tanstack/react-query";
import { useMissionStatus } from "@/hooks/useMission";

function MissionDrawer({
  open,
  setOpen,
  groupId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  groupId: number;
}) {
  const [selectedMission, setSelectedMission] =
    useState<IAvailableMissionDto | null>(null);

  const { refetch: refetchMissionStatus } = useMissionStatus(groupId);

  const { data: availableMissionData, refetch } = useAvailableMission(groupId);
  const { mutate: assignNewMission } = useMutation({
    ...missionQueries.selectMission(groupId),
    onSuccess: () => {
      refetch();
      setOpen(false);
      refetchMissionStatus();
    },
    onError: (error) => {
      missionQueries.onError(error, "미션 선택에 실패했습니다.");
      refetch();
    },
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="w-full max-w-sm mx-auto p-4">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">미션 선택</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-2 overflow-y-auto mb-4">
          {availableMissionData &&
            [...availableMissionData.availableMissions]
              .reverse()
              .map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  mission={mission}
                  className={`${
                    selectedMission?.missionId === mission.missionId
                      ? "border-brown-dark/50"
                      : ""
                  } ${
                    mission.remainingSelections > 0 &&
                    !mission.alreadySelectedInWeek
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-50"
                  }`}
                  onClick={() => {
                    setSelectedMission(mission);
                  }}
                />
              ))}
        </div>

        <Button
          className="w-full cursor-pointer"
          disabled={!selectedMission}
          onClick={() => {
            if (selectedMission) {
              assignNewMission({
                missionId: selectedMission.missionId,
                groupId,
              });
            }
          }}
        >
          미션 선택
        </Button>
      </DrawerContent>
    </Drawer>
  );
}

export default MissionDrawer;
