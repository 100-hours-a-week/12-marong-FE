import SurveyHeader from "../../components/SurveyHeader.jsx";
import HorizontalProgressBar from "../../components/HorizontalProgressBar.jsx";
import {useRef, useState} from "react";

function SurveyHobby({data, onUpdate, onPrev, onNext}) {
  const [hobbies, setHobbies] = useState([
    "운동", "독서", "음악 감상", "여행", "게임", "요리", "OTT 시청", "문화생활",
  ])

  const inputRef = useRef(null)
  const [selected, setSelected] = useState(data || [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [customInput, setCustomInput] = useState("")
  const [error, setError] = useState("")

  const toggleHobby = (hobby) => {
    if (selected.includes(hobby)) {
      setSelected(selected.filter((h) => h !== hobby))
      setError("")
    } else {
      if (selected.length >= 3) {
        setError("최대 3개까지 선택할 수 있습니다.")
        return
      }
      setSelected([...selected, hobby])
      setError("")
    }
  }

  const addNewHobby = () => {
    const newHobby = customInput.trim()
    if (!newHobby) return
    if (hobbies.includes(newHobby)) return

    setHobbies([...hobbies, newHobby])
    setShowAddForm(false)
    setCustomInput("")

    if (selected.length < 3) {
      setSelected([...selected, newHobby])
    }
  }

  const handleNext = () => {
    if (selected.length === 0) {
      {
        setError("최소 1개 이상의 취미를 선택해야 합니다.")
      }
      return
    }
    onUpdate(selected)
    onNext()
  }

  return (
    <div className="w-full min-h-dvh flex flex-col items-start space-y-4 p-4">
      {/* 헤더 */}
      <SurveyHeader title="Q2. 나의 취미 선택하기" description="자신의 취미를 선택해 주세요.(최소 1개, 최대 3개)"/>

      {/* 진행 상태 바 */}
      <HorizontalProgressBar progress={(2 / 3) * 100}/>

      {/* 취미 선택 */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {hobbies.map((hobby) => (
          <button
            key={hobby}
            onClick={() => toggleHobby(hobby)}
            className={`py-3 px-8 rounded-full text-center border-2 border-brand-pink transition ${selected.includes(hobby) ? "bg-brand-pink" : "bg-white"}`}
          >
            {hobby}
          </button>
        ))}

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="py-3 px-8 rounded-full text-center transition bg-brand-pink"
          >
            + 직접 입력
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="mt-4">
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink"
              autoFocus={true}
            />
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Spacer */}
      <div className="flex-grow"/>

      {/* 네비게이션 버튼 */}
      <div className="mt-auto w-full flex flex-row gap-4">
        <div className="flex w-full gap-4">
          <button
            onClick={() => onPrev()}
            className="flex-1 py-4 bg-brand-pink text-black font-medium rounded-full"
          >
            이전
          </button>
        </div>

        <div className="flex w-full gap-4">
          <button
            onClick={() => handleNext()}
            className="flex-1 py-4 bg-brand-pink text-black font-medium rounded-full"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  )
}

export default SurveyHobby