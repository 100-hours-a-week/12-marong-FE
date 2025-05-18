import defaultProfile from '../assets/default_profile.png'

function ManittoInfoCard({ manitto }) {
  return (
    <div className="flex gap-4 p-4 items-center">
      <img
        src={manitto.profileImage ? manitto.profileImage : defaultProfile}
        alt="프로필 이미지"
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex flex-col gap-1">
        <div className="font-bold text-start">당신의 비밀 임무 상대는?!</div>
        <div className="font-bold text-start text-brand-brown_dark">{manitto.name}</div>
      </div>
    </div>
  )
}

export default ManittoInfoCard