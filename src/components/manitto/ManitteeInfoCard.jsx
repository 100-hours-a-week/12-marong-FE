import defaultProfile from "@/assets/default_profile.png";

function ManitteeInfoCard({ data }) {
  console.log("Manittee Info Card: ", data);

  if (!data.currentManittee) {
    return (
      <div className="flex flex-col p-4">
        <div className="font-bold text-start">매칭된 마니또가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <img
        src={
          data.period === "MANITTO_ACTIVE"
            ? data.currentManittee.groupProfileImage || defaultProfile
            : defaultProfile
        }
        alt="프로필 이미지"
        className="object-cover w-16 h-16 rounded-full"
      />

      {/* {data.period === "MANITTO_REVEAL" && (
        <div className="flex flex-col">
          <div className="font-bold text-start">
            이번주 내 마니또의 정체는?!
          </div>
          <div className="font-bold text-start text-brand-brown_dark">
            {data.revealedManitto.groupNickname}
          </div>
        </div>
      )} */}

      {data.period === "MANITTO_ACTIVE" && (
        <div className="flex flex-col gap-1">
          <div className="font-bold text-start">당신의 비밀 임무 상대는?!</div>
          <div className="font-bold text-start text-brand-brown_dark">
            {data.currentManittee.groupNickname}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManitteeInfoCard;
