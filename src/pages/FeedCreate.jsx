import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MissionCard from "../components/MissionCard.jsx";
import api from "../api/instance/backend.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useMutation } from "@tanstack/react-query";
import { feedQueries } from "@/api/query/FeedQueries.js";

function FeedCreate() {
  const location = useLocation();
  const mission = location.state?.mission;
  const groupId = location.state?.groupId;
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [content, setContent] = useState("");

  const { mutate: uploadFeed, isLoading } = useMutation({
    ...feedQueries.uploadFeed(groupId),
    onSuccess: (data, { missionId, content, image }) => {
      console.log("피드 등록 성공:", data);
      window.location.href = "/main/home";
    },
  });

  if (!mission) {
    return <div>미션 정보가 없습니다.</div>;
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col w-full h-full gap-4 px-4 py-4">
      {isLoading && <LoadingSpinner />}

      <div className="text-xl font-bold text-start">마니또 약올리기 🤪</div>

      <div className="rounded-lg ring-2 ring-brand-pink">
        <MissionCard mission={mission} />
      </div>

      <textarea
        className="w-full h-32 p-3 text-sm border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
        placeholder="오늘 마니띠를 어떻게 놀려줬나요?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="cursor-pointer">
        <div className="flex items-center justify-center w-full h-auto text-gray-400 transition border border-dashed min-h-96 rounded-xl hover:border-brand-pink">
          {uploadImgUrl ? (
            <img
              src={uploadImgUrl}
              alt="업로드 미리보기"
              className="w-full rounded-xl"
            />
          ) : (
            "이미지를 업로드하세요"
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />
      </label>

      <button
        className="py-3 font-bold text-white bg-brand-pink rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() =>
          uploadFeed({
            missionId: mission.missionId,
            content,
            image: uploadImgUrl,
          })
        }
        disabled={!content}
      >
        피드 등록하기
      </button>
    </div>
  );
}

export default FeedCreate;
