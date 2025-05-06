function MissionCard({ mission }) {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border">
      <div className="font-bold text-start text-sm">{mission.title}</div>
      <div className="text-start text-sm">{mission.description}</div>
    </div>
  )
}

export default MissionCard