import { useMutation, useQuery } from "@tanstack/react-query";
import { manittoQueries } from "@/api/manitto/queries";
import { useGroupStore } from "@/hooks/useGroupContext";
import { Label } from "@/components/ui/label";
import ManittoCard from "@/components/pages/manitto/ManittoCard";
import CountdownTimer from "@/components/common/CountdownTimer";
import { useMissionStatus } from "@/hooks/useMission";
import MissionCard from "@/components/pages/mission/MissionCard";
import HorizontalProgressBar from "@/components/pages/survey/HorizontalProgressBar";
import FloatingButton from "@/components/common/FloatingAddButton";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAvailableMission } from "@/hooks/useAvailableMission";
import MissionDrawer from "@/components/pages/mission/MissionDrawer";

function ManittoPage() {
  const { selectedGroup } = useGroupStore();
  const [isMissionDrawerOpen, setIsMissionDrawerOpen] = useState(false);

  if (!selectedGroup) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <div className="text-lg font-bold text-center">
          그룹을 선택해주세요.
        </div>
      </div>
    );
  }

  const { data: manittoDetail } = useQuery({
    ...manittoQueries.getManittoDetail(selectedGroup.groupId),
    staleTime: Infinity,
    gcTime: Infinity,
  });
  const { data: missionStatus, refetch: refetchMissionStatus } =
    useMissionStatus(selectedGroup.groupId);

  const { mutate: assignNewMission } = useMutation({
    ...manittoQueries.assignNewMission(selectedGroup.groupId),
    onSuccess: () => {
      refetchMissionStatus();
    },
  });

  // const { data: availableMissionData } = useAvailableMission(
  //   selectedGroup.groupId
  // );

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 p-4 border-b">
        <Label className="text-lg font-bold">
          다음 마니또 공개까지 남은 시간
        </Label>
        {manittoDetail?.remainingTime && (
          <CountdownTimer initialTime={manittoDetail.remainingTime} />
        )}
      </div>

      {manittoDetail?.previousCycleManitto && (
        <ManittoCard
          title="지난주 마니또 정보"
          imageUrl={manittoDetail.previousCycleManitto.groupProfileImage}
          description="지난주 내 마니또의 정체는?!"
          name={
            manittoDetail.previousCycleManitto.groupNickname ||
            manittoDetail.previousCycleManitto.name ||
            "이름 정보 없음"
          }
        />
      )}

      {manittoDetail?.currentManittee && (
        <ManittoCard
          title="이번주 마니띠 정보"
          imageUrl={manittoDetail.currentManittee.groupProfileImage}
          description="당신의 비밀 임무 상대는?!"
          name={
            manittoDetail.currentManittee.groupNickname ||
            manittoDetail.currentManittee.name ||
            "이름 정보 없음"
          }
        />
      )}

      {manittoDetail?.currentManitto && (
        <ManittoCard
          title="이번주 마니또 정보"
          description="당신의 비밀 마니또는?!"
          name={manittoDetail.currentManitto.anonymousName || "이름 정보 없음"}
        />
      )}

      {manittoDetail?.revealedManitto && (
        <ManittoCard
          title="이번주 공개된 마니또 정보"
          imageUrl={manittoDetail.revealedManitto.groupProfileImage}
          description="이번주 마니또의 정체는?!"
          name={
            manittoDetail.revealedManitto.groupNickname ||
            manittoDetail.revealedManitto.name ||
            "이름 정보 없음"
          }
        />
      )}

      {missionStatus && (
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row justify-between w-full">
            <Label className="text-lg font-bold">미션 진행 상태</Label>
            <Label className="text-lg font-bold">
              {missionStatus.progress.completed} /{" "}
              {missionStatus.progress.total}
            </Label>
          </div>

          <HorizontalProgressBar
            progress={
              (missionStatus.progress.completed /
                missionStatus.progress.total) *
              100
            }
          />

          {missionStatus.missions.inProgress.length > 0 && (
            <>
              <Label className="text-lg font-bold text-brown-dark">
                진행 중인 미션
              </Label>
              {missionStatus.missions.inProgress.map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  mission={mission}
                  className="border-brown-dark/50"
                />
              ))}
            </>
          )}

          {missionStatus.missions.completed.length > 0 && (
            <>
              <Label className="text-lg font-bold text-brown-dark">
                완료한 미션
              </Label>
              {missionStatus.missions.completed.map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  mission={mission}
                  className="border-brown"
                />
              ))}
            </>
          )}

          {missionStatus.missions.incomplete.length > 0 && (
            <>
              <Label className="text-lg font-bold text-brown-dark">
                미완료 미션
              </Label>
              {missionStatus.missions.incomplete.map((mission) => (
                <MissionCard
                  key={mission.missionId}
                  mission={mission}
                  className="opacity-50"
                />
              ))}
            </>
          )}
        </div>
      )}

      <FloatingButton
        onClick={() => {
          setIsMissionDrawerOpen(true);
        }}
      >
        <Plus />
      </FloatingButton>

      <MissionDrawer
        open={isMissionDrawerOpen}
        setOpen={setIsMissionDrawerOpen}
        groupId={selectedGroup.groupId}
      />
    </div>
  );
}

export default ManittoPage;
