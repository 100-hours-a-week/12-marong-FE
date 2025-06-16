import defaultProfile from "@/assets/default_profile.png";

function ManittoPrevCard({ data }) {
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

      <div className="flex flex-col">
        <div className="font-bold text-start">저번주 내 마니또의 정체는?!</div>
        <div className="font-bold text-start text-brand-brown_dark">
          {data.groupNickname}
        </div>
      </div>
    </div>
  );
}

export default ManittoPrevCard;
