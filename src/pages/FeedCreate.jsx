import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import MissionCard from "../components/MissionCard.jsx";
import api from "../api/instance/backend.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function FeedCreate() {
  const location = useLocation();
  const mission = location.state?.mission;
  const [uploadImgUrl, setUploadImgUrl] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    console.log("Mission: ", mission)
  }, [mission])

  if (!mission) {
    return <div>미션 정보가 없습니다.</div>
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("missionId", mission.missionId);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    api.post("feeds", formData, {
      headers: {"Content-Type": "multipart/form-data"},
    })
      .then((res) => {
        console.log("피드 등록 성공:", res.data);
        window.location.href = "/main/home";
      })
      .catch((err) => {
        console.log("Error:", err);
        alert("업로드 실패: " + err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full h-full px-4 py-4 gap-4">
      {isLoading && (
        <LoadingSpinner/>
      )}


      <div className="font-bold text-xl text-start">마니또 약올리기 🤪</div>

      <div className="rounded-lg ring-2 ring-brand-pink">
        <MissionCard mission={mission}/>
      </div>

      <textarea
        className="w-full h-32 p-3 border rounded-xl resize-none text-sm focus:outline-none focus:ring-2 focus:ring-brand-pink"
        placeholder="오늘 마니띠를 어떻게 놀려줬나요?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label className="cursor-pointer">
        <div
          className="w-full min-h-96 h-auto border border-dashed rounded-xl flex items-center justify-center text-gray-400 hover:border-brand-pink transition">
          {uploadImgUrl ? (
            <img src={uploadImgUrl} alt="업로드 미리보기" className="w-full rounded-xl"/>
          ) : (
            "이미지를 업로드하세요"
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      <button
        className="bg-brand-pink text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={!content}
      >
        피드 등록하기
      </button>
    </div>
  )
}

export default FeedCreate;