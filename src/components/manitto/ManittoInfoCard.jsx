import defaultProfile from "@/assets/default_profile.png";

function ManittoInfoCard({ data }) {
  if (!data.revealedManitto && !data.currentManitto) {
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
          data.period === "MANITTO_REVEAL"
            ? data.revealedManitto.groupProfileImage || defaultProfile
            : defaultProfile
        }
        alt="프로필 이미지"
        className="object-cover w-16 h-16 rounded-full"
      />

      {data.period === "MANITTO_REVEAL" && (
        <div className="flex flex-col">
          <div className="font-bold text-start">
            이번주 내 마니또의 정체는?!
          </div>
          <div className="font-bold text-start text-brand-brown_dark">
            {data.revealedManitto.groupNickname}
          </div>
        </div>
      )}

      {data.period === "MANITTO_ACTIVE" && (
        <div className="flex flex-row">
          <div className="font-bold text-start text-brand-brown_dark">
            {data.currentManitto.anonymousName}
          </div>
          <div className="font-bold text-start">
            이(가) 비밀 임무를 수행중...
          </div>
        </div>
      )}
    </div>
  );
}

export default ManittoInfoCard;
