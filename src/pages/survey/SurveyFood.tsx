import SurveyHeader from "@/components/pages/survey/SurveyHeader";
import HorizontalProgressBar from "@/components/pages/survey/HorizontalProgressBar";
import { useRef, useState } from "react";
import type { ISurveyRequest } from "@/api/survey/type";

function SurveyFood({
  data,
  onUpdate,
  onPrev,
  onNext,
}: {
  data: ISurveyRequest;
  onUpdate: (data: any) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const inputRef = useRef(null);
  const [likedFood, setLikedFood] = useState([
    "한식",
    "중식",
    "일식",
    "양식",
    "채식",
    "해산물",
  ]);
  const [dislikedFood, setDislikedFood] = useState([
    "한식",
    "중식",
    "일식",
    "양식",
    "채식",
    "해산물",
  ]);

  const [selectedLiked, setSelectedLiked] = useState(data.likedFoods || []);
  const [selectedDisliked, setSelectedDisliked] = useState(
    data.dislikedFoods || []
  );
  const [showAddFormLiked, setShowAddFormLiked] = useState(false);
  const [showAddFormDisliked, setShowAddFormDisliked] = useState(false);
  const [customInputLiked, setCustomInputLiked] = useState("");
  const [customInputDisliked, setCustomInputDisliked] = useState("");
  const [errorLiked, setErrorLiked] = useState("");
  const [errorDisliked, setErrorDisliked] = useState("");

  const toggleLikedFood = (food: string) => {
    if (selectedLiked.includes(food)) {
      setSelectedLiked(selectedLiked.filter((f: string) => f !== food));
      setErrorLiked("");
    } else {
      if (selectedLiked.length >= 3) {
        setErrorLiked("최대 3개까지 선택할 수 있습니다.");
        return;
      }
      setSelectedLiked([...selectedLiked, food]);
      setErrorLiked("");
    }
  };

  const toggleDislikedFood = (food: string) => {
    if (selectedDisliked.includes(food)) {
      setSelectedDisliked(selectedDisliked.filter((f: string) => f !== food));
      setErrorDisliked("");
    } else {
      if (selectedDisliked.length >= 3) {
        setErrorDisliked("최대 3개까지 선택할 수 있습니다.");
        return;
      }
      setSelectedDisliked([...selectedDisliked, food]);
      setErrorDisliked("");
    }
  };

  const addNewLikedFood = () => {
    const newFood = customInputLiked.trim();
    if (!newFood) return;
    if (likedFood.includes(newFood)) return;

    setLikedFood([...likedFood, newFood]);
    setShowAddFormLiked(false);
    setCustomInputLiked("");
    if (selectedLiked.length < 3) {
      setSelectedLiked([...selectedLiked, newFood]);
    }
  };

  const addNewDislikedFood = () => {
    const newFood = customInputDisliked.trim();
    if (!newFood) return;
    if (dislikedFood.includes(newFood)) return;
    setDislikedFood([...dislikedFood, newFood]);
    setShowAddFormDisliked(false);
    setCustomInputDisliked("");
    if (selectedDisliked.length < 3) {
      setSelectedDisliked([...selectedDisliked, newFood]);
    }
  };

  const handleNext = () => {
    onUpdate({
      ...data,
      likedFoods: selectedLiked,
      dislikedFoods: selectedDisliked,
    });

    if (selectedLiked.length === 0) {
      setErrorLiked("최소 1개 이상의 음식을 선택해야 합니다.");
      return;
    }
    if (selectedDisliked.length === 0) {
      setErrorDisliked("최소 1개 이상의 음식을 선택해야 합니다.");
      return;
    }

    onNext();
  };

  return (
    <div className="flex flex-col items-start p-4 space-y-4 w-full min-h-dvh">
      {/* 헤더 */}
      <SurveyHeader
        title="Q3. 나의 음식 취향 선택하기"
        description="자신의 음식 취향을 선택해 주세요.(최소 1개, 최대 3개)"
      />

      {/* 진행 상태 바 */}
      <HorizontalProgressBar progress={(2.9 / 3) * 100} />

      {/* 좋아하는 음식 선택 */}
      <div className="mb-2 text-lg font-bold">좋아하는 음식</div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {likedFood.map((food) => (
          <button
            key={food}
            onClick={() => toggleLikedFood(food)}
            className={`py-3 px-8 rounded-full text-center border-2 border-brown-light transition ${
              selectedLiked.includes(food) ? "bg-brown-light" : "bg-white"
            }`}
          >
            {food}
          </button>
        ))}

        {!showAddFormLiked && (
          <button
            onClick={() => setShowAddFormLiked(true)}
            className="px-8 py-3 text-center rounded-full transition bg-brown-light"
          >
            + 직접 입력
          </button>
        )}

        {showAddFormLiked && (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={customInputLiked}
              onChange={(e) => setCustomInputLiked(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && addNewLikedFood()}
              onBlur={addNewLikedFood}
              maxLength={5}
              placeholder="직접 입력"
              className="flex-1 px-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-light"
              autoFocus={true}
            />
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {errorLiked && <p className="mt-2 text-sm text-red-500">{errorLiked}</p>}

      {/* 싫어하는 음식 선택 */}
      <div className="my-2 text-lg font-bold">싫어하는 음식</div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {dislikedFood.map((food) => (
          <button
            key={food}
            onClick={() => toggleDislikedFood(food)}
            className={`py-3 px-8 rounded-full text-center border-2 border-brown-light transition ${
              selectedDisliked.includes(food) ? "bg-brown-light" : "bg-white"
            }`}
          >
            {food}
          </button>
        ))}

        {!showAddFormDisliked && (
          <button
            onClick={() => setShowAddFormDisliked(true)}
            className="px-8 py-3 text-center rounded-full transition bg-brown-light"
          >
            + 직접 입력
          </button>
        )}

        {showAddFormDisliked && (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={customInputDisliked}
              onChange={(e) => setCustomInputDisliked(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && addNewDislikedFood()}
              onBlur={addNewDislikedFood}
              maxLength={5}
              placeholder="직접 입력"
              className="flex-1 px-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-light"
              autoFocus={true}
            />
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {errorDisliked && (
        <p className="mt-2 text-sm text-red-500">{errorDisliked}</p>
      )}

      {/* Spacer */}
      <div className="flex-grow" />

      {/* 네비게이션 버튼 */}
      <div className="flex flex-row gap-4 mt-auto w-full">
        <div className="flex gap-4 w-full">
          <button
            onClick={() => onPrev()}
            className="flex-1 py-4 font-medium text-black rounded-full bg-brown-light"
          >
            이전
          </button>
        </div>

        <div className="flex gap-4 w-full">
          <button
            onClick={() => handleNext()}
            className="flex-1 py-4 font-medium text-black rounded-full bg-brown-light"
          >
            설문 종료
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyFood;
