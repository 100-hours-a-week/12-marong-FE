import { useEffect, useState } from "react";
import { useGroup } from "../context/GroupContext.jsx";
import api from "../api/instance/backend.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import CountdownTimer from "../components/CountdownTimer.jsx";
import Divider from "../components/Divider.jsx";
import HorizontalProgressBar from "../components/HorizontalProgressBar.jsx";
import MissionCard from "../components/MissionCard.jsx";
import ManittoInfoCard from "@/components/manitto/ManittoInfoCard.jsx";
import FloatingAddButton from "../components/FloatingAddButton.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { manittoQueries } from "@/api/query/ManittoQueries.js";
import ManitteeInfoCard from "@/components/manitto/ManitteeInfoCard.jsx";

function Manitto() {
  const { selectedGroup } = useGroup();

  const { data: manitto } = useQuery({
    ...manittoQueries.getManittoDetail(selectedGroup?.groupId),
    enabled: !!selectedGroup?.groupId,
  });

  const { data: missions } = useQuery({
    ...manittoQueries.getMissionStatus(selectedGroup?.groupId),
    enabled: !!selectedGroup?.groupId,
  });

  const { mutate: assignMission } = useMutation({
    ...manittoQueries.assignMission(selectedGroup?.groupId),
    enabled: !!selectedGroup?.groupId,
    onSuccess: () => {
      window.location.reload();
    },
  });

  useEffect(() => {
    console.log("Manitto: ", manitto);
  }, [manitto]);

  useEffect(() => {
    console.log("Missions: ", missions);
  }, [missions]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 p-4 overflow-y-auto">
        <div className="font-bold text-start">
          {manitto?.data.period === "MANITTO_REVEAL"
            ? "다음 마니또 시작까지 남은 시간"
            : "다음 마니또 공개까지 남은 시간"}
        </div>
        {manitto && <CountdownTimer initialTime={manitto.data.remainingTime} />}
      </div>

      <Divider />

      {manitto && manitto.data.period === "MANITTO_ACTIVE" && (
        <div className="flex flex-col overflow-y-auto">
          <div className="px-4 pt-4 font-bold text-start text-brand-brown_dark">
            마니띠 정보
          </div>
          <ManitteeInfoCard data={manitto.data} />
        </div>
      )}

      <Divider />

      {manitto && (
        <div className="flex flex-col overflow-y-auto">
          <div className="px-4 pt-4 font-bold text-start text-brand-brown_dark">
            마니또 정보
          </div>
          {manitto && <ManittoInfoCard data={manitto.data} />}
        </div>
      )}

      <Divider />

      {missions && (
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between w-full">
            <div className="font-bold text-start">미션 달성률</div>
            <div className="font-bold text-start">
              {missions.data.progress.completed} /{" "}
              {missions.data.progress.total}
            </div>
          </div>

          <HorizontalProgressBar
            progress={
              (missions.data.progress.completed /
                missions.data.progress.total) *
              100
            }
          />

          <div className="font-bold text-start">진행중인 미션</div>

          {missions.data.missions.inProgress.map((mission) => (
            <div key={mission.missionId}>
              <MissionCard mission={mission} />
            </div>
          ))}

          <div className="font-bold text-start">완료된 미션</div>

          {missions.data.missions.completed.map((mission) => (
            <div key={mission.missionId}>
              <MissionCard mission={mission} />
            </div>
          ))}

          <div className="font-bold text-start">완료하지 못한 미션</div>

          {missions.data.missions.incomplete.map((mission) => (
            <div key={mission.missionId}>
              <MissionCard mission={mission} />
            </div>
          ))}
        </div>
      )}

      <FloatingAddButton
        onClick={() => {
          assignMission();
        }}
      />
    </div>
  );
}

export default Manitto;
