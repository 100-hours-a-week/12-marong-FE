import type { IMissionDto } from "@/api/manitto/type";
import type { IAvailableMissionDto } from "@/api/mission/type";

function MissionCard({
  mission,
  className,
  onClick,
  ...props
}: {
  mission: IMissionDto | IAvailableMissionDto;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex flex-col gap-2 p-4 bg-white rounded-xl border-[3px] ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-row justify-between">
        <div className="text-sm font-bold text-start">{mission.title}</div>
        <div className="text-sm text-start text-brown-dark">
          난이도: {mission.difficulty}
        </div>
      </div>
      <div className="text-sm text-start">{mission.description}</div>
      {"remainingSelections" in mission && (
        <div className="text-sm text-end">
          {mission.remainingSelections} / {mission.maxSelections}
        </div>
      )}
    </div>
  );
}

export default MissionCard;
