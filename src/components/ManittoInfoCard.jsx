function ManittoInfoCard({ manitto }) {
  return (
    <div className="flex gap-4 p-4 items-center">
      <img
        src={manitto.profileImage ? manitto.profileImage : "https://placehold.co/600/pink/white"}
        alt="프로필 이미지"
        className="w-16 h-16 rounded-full"
      />

      <div className="font-bold text-start">{manitto.name}</div>
    </div>
  )
}

export default ManittoInfoCard