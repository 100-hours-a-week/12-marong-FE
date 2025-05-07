import {useEffect, useState} from "react";
import {useGroup} from "../context/GroupContext.jsx";
import api from "../api/axios.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import CountdownTimer from "../components/CountdownTimer.jsx";
import Divider from "../components/Divider.jsx";
import HorizontalProgressBar from "../components/HorizontalProgressBar.jsx";
import MissionCard from "../components/MissionCard.jsx";
import ManittoInfoCard from "../components/ManittoInfoCard.jsx";
import FloatingAddButton from "../components/FloatingAddButton.jsx";

function Manitto() {
  const {selectedGroup} = useGroup()
  const [isLoading, setIsLoading] = useState(true)
  const [manitto, setManitto] = useState(null)
  const [missionsCompleted, setMissionsCompleted] = useState([])
  const [missionsInProgress, setMissionsInProgress] = useState([])

  useEffect(() => {
    // 마니또 정보 조회
    api.get("manitto")
      .then(res => {
        setManitto(res.data.data.manitto)
      })
      .catch(err => {
        console.log("Error:", err)
      })
      .finally(() => {
        setIsLoading(false)
      })

    // 미션 목록 조회
    api.get("manitto/missions")
      .then(res => {
        const missions = res.data.data.missions

        setMissionsCompleted(missions.completed)
        setMissionsInProgress(missions.inProgress)
      })
      .catch(err => {
        console.log("Error:", err)
      })

  }, []);

  const handleMissionAdd = () => {
    api.post("manitto/missions/assign")
      .then(res => {
        console.log("Mission added:", res.data)
      })
      .catch(err => {
        console.log("Error:", err)
      })
  }

  // DEBUG: 콘솔 로그
  useEffect(() => {
    console.log("Manitto: ", manitto)
  }, [manitto])

  // DEBUG: 콘솔 로그
  useEffect(() => {
    console.log("Missions Completed: ", missionsCompleted)
  }, [missionsCompleted])

  // DEBUG: 콘솔 로그
  useEffect(() => {
    console.log("Missions In Progress: ", missionsInProgress)
  }, [missionsInProgress])

  // 로딩 중
  if (isLoading) {
    return (
      <LoadingSpinner/>
    )
  } else {
    // 마니또 정보 조회 실패 시
    if (manitto === null) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-center text-2xl font-bold">마니또 정보를 찾을 수 없습니다.</div>
        </div>
      )
    }
    // 마니또 정보 조회 성공 시
    else {
      return (
        <div className="flex flex-col">
          {/* 마니또 공개 타이머 */}
          <div className="flex flex-col overflow-y-auto p-4 gap-2">
            <div className="font-bold text-start">다음 마니또 공개까지 남은 시간</div>
            <CountdownTimer initialTime={manitto.remainingTime}/>
          </div>

          <Divider/>

          {/* 마니또 정보 */}
          <ManittoInfoCard manitto={manitto}/>

          <Divider/>

          {/* 미션 목록 */}
          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full justify-between">
              <div className="font-bold text-start">미션 달성률</div>
              <div className="font-bold text-start">
                {missionsCompleted.length} / {missionsCompleted.length + missionsInProgress.length}
              </div>
            </div>

            <HorizontalProgressBar
              progress={missionsCompleted.length / (missionsCompleted.length + missionsInProgress.length) * 100}/>

            {/* 진행중인 미션 */}
            <div className="font-bold text-start">진행중인 미션</div>

            {missionsInProgress.map((mission) => (
              <MissionCard mission={mission}/>
            ))}

            {/* 완료된 미션 */}
            <div className="font-bold text-start">완료된 미션</div>

            {missionsCompleted.map((mission) => (
              <MissionCard mission={mission}/>
            ))}
          </div>

          {/* 미션 추가 버튼 */}
          <FloatingAddButton onClick={handleMissionAdd}/>
        </div>
      )
    }
  }
}

export default Manitto