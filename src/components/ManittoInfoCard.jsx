import defaultProfile from '../assets/default_profile.png'

function ManittoInfoCard({ manitto }) {
  return (
    <div className="flex gap-4 p-4 items-center">
      <img
        src={manitto.profileImage ? manitto.profileImage : defaultProfile}
        alt="프로필 이미지"
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="font-bold text-start">{manitto.name}</div>
    </div>
  )
}

export default ManittoInfoCard