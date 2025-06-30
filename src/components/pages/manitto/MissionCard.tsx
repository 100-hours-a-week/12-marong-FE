import type { IMissionDto } from "@/api/manitto/type";

function MissionCard({ mission }: { mission: IMissionDto }) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border-2 border-brown-light">
      <div className="flex flex-row justify-between">
        <div className="text-sm font-bold text-start">{mission.title}</div>
        <div className="text-sm text-start text-brown-dark">
          난이도: {mission.difficulty}
        </div>
      </div>
      <div className="text-sm text-start">{mission.description}</div>
    </div>
  );
}

export default MissionCard;
