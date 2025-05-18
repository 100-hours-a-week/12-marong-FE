import defaultProfile from '../assets/default_profile.png'

function ManittoInfoCard({role, manitto, manittee}) {
  const profileImage = role === "manittee" ? defaultProfile : manittee.profileImage

  return (
    <div className="flex gap-4 p-4 items-center">
      <img
        src={profileImage}
        alt="프로필 이미지"
        className="w-16 h-16 rounded-full object-cover"
      />

      {role === "manittee" && (
        <div className="flex flex-row">
          <div className="font-bold text-start text-brand-brown_dark">{manitto.anonymousName}</div>
          <div className="font-bold text-start">이(가) 비밀 임무를 수행중...</div>
        </div>
      )}

      {role === "manitto" && (
        <div className="flex flex-col gap-1">
          <div className="font-bold text-start">
            당신의 비밀 임무 상대는?!
          </div>
          <div className="font-bold text-start text-brand-brown_dark">{manittee.name}</div>
        </div>
      )}

      {role === null && (
        <div className="font-bold text-start">{manittee.name}</div>
      )}
    </div>
  )
}

export default ManittoInfoCard