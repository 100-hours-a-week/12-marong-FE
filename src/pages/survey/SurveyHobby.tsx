import SurveyHeader from "@/components/pages/survey/SurveyHeader";
import HorizontalProgressBar from "@/components/pages/survey/HorizontalProgressBar";
import { useRef, useState } from "react";
import type { ISurveyRequest } from "@/api/survey/type";

function SurveyHobby({
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
  const [hobbies, setHobbies] = useState([
    "운동",
    "독서",
    "음악 감상",
    "여행",
    "게임",
    "요리",
    "OTT 시청",
    "문화생활",
  ]);

  const inputRef = useRef(null);
  const [selected, setSelected] = useState(data.hobbies);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [error, setError] = useState("");

  const toggleHobby = (hobby: string) => {
    if (selected.includes(hobby)) {
      setSelected(selected.filter((h: string) => h !== hobby));
      setError("");
    } else {
      if (selected.length >= 3) {
        setError("최대 3개까지 선택할 수 있습니다.");
        return;
      }
      setSelected([...selected, hobby]);
      setError("");
    }
  };

  const addNewHobby = () => {
    const newHobby = customInput.trim();
    if (!newHobby) return;
    if (hobbies.includes(newHobby)) return;

    setHobbies([...hobbies, newHobby]);
    setShowAddForm(false);
    setCustomInput("");

    if (selected.length < 3) {
      setSelected([...selected, newHobby]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) {
      {
        setError("최소 1개 이상의 취미를 선택해야 합니다.");
      }
      return;
    }
    onUpdate({
      ...data,
      hobbies: selected,
    });
    onNext();
  };

  return (
    <div className="flex flex-col flex-1 items-start p-4 space-y-4 w-full min-h-dvh">
      {/* 헤더 */}
      <SurveyHeader
        title="Q2. 나의 취미 선택하기"
        description="자신의 취미를 선택해 주세요.(최소 1개, 최대 3개)"
      />

      {/* 진행 상태 바 */}
      <HorizontalProgressBar progress={(2 / 3) * 100} />

      {/* 취미 선택 */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {hobbies.map((hobby) => (
          <button
            key={hobby}
            onClick={() => toggleHobby(hobby)}
            className={`py-3 px-8 rounded-full text-center border-2 border-brown-light transition ${
              selected.includes(hobby) ? "bg-brown-light" : "bg-white"
            }`}
          >
            {hobby}
          </button>
        ))}

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-8 py-3 text-center rounded-full transition bg-brown-light"
          >
            + 직접 입력
          </button>
        )}

        {showAddForm && (
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && addNewHobby()}
              onBlur={addNewHobby}
              maxLength={10}
              placeholder="직접 입력"
              className="flex-1 px-4 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-light"
              autoFocus={true}
            />
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

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
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyHobby;
