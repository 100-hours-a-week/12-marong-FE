import SurveyHeader from "../../components/SurveyHeader.jsx";
import HorizontalProgressBar from "../../components/HorizontalProgressBar.jsx";
import {useRef, useState} from "react";

function SurveyFood({data, onUpdate, onPrev, onNext}) {
  const inputRef = useRef(null)
  const [likedFood, setLikedFood] = useState([
    "한식", "중식", "일식", "양식", "채식", "해산물",
  ])
  const [dislikedFood, setDislikedFood] = useState([
    "한식", "중식", "일식", "양식", "채식", "해산물",
  ])

  const [selectedLiked, setSelectedLiked] = useState(data.likedFoods || [])
  const [selectedDisliked, setSelectedDisliked] = useState(data.dislikedFoods || [])
  const [showAddFormLiked, setShowAddFormLiked] = useState(false)
  const [showAddFormDisliked, setShowAddFormDisliked] = useState(false)
  const [customInputLiked, setCustomInputLiked] = useState("")
  const [customInputDisliked, setCustomInputDisliked] = useState("")
  const [errorLiked, setErrorLiked] = useState("")
  const [errorDisliked, setErrorDisliked] = useState("")

  const toggleLikedFood = (food) => {
    if (selectedLiked.includes(food)) {
      setSelectedLiked(selectedLiked.filter((f) => f !== food))
      setErrorLiked("")
    } else {
      if (selectedLiked.length >= 3) {
        setErrorLiked("최대 3개까지 선택할 수 있습니다.")
        return
      }
      setSelectedLiked([...selectedLiked, food])
      setErrorLiked("")
    }
  }

  const toggleDislikedFood = (food) => {
    if (selectedDisliked.includes(food)) {
      setSelectedDisliked(selectedDisliked.filter((f) => f !== food))
      setErrorDisliked("")
    } else {
      if (selectedDisliked.length >= 3) {
        setErrorDisliked("최대 3개까지 선택할 수 있습니다.")
        return
      }
      setSelectedDisliked([...selectedDisliked, food])
      setErrorDisliked("")
    }
  }

  const addNewLikedFood = () => {
    const newFood = customInputLiked.trim()
    if (!newFood) return
    if (likedFood.includes(newFood)) return

    setLikedFood([...likedFood, newFood])
    setShowAddFormLiked(false)
    setCustomInputLiked("")
    if (selectedLiked.length < 3) {
      setSelectedLiked([...selectedLiked, newFood])
    }
  }

  const addNewDislikedFood = () => {
    const newFood = customInputDisliked.trim()
    if (!newFood) return
    if (dislikedFood.includes(newFood)) return
    setDislikedFood([...dislikedFood, newFood])
    setShowAddFormDisliked(false)
    setCustomInputDisliked("")
    if (selectedDisliked.length < 3) {
      setSelectedDisliked([...selectedDisliked, newFood])
    }
  }

  const handleNext = () => {
    onUpdate({
      likedFoods: selectedLiked,
      dislikedFoods: selectedDisliked,
    })

    if (selectedLiked.length === 0) {
      setErrorLiked("최소 1개 이상의 음식을 선택해야 합니다.")
      return
    }
    if (selectedDisliked.length === 0) {
      setErrorDisliked("최소 1개 이상의 음식을 선택해야 합니다.")
      return
    }

    onNext()
  }

  return (
    <div className="w-full min-h-dvh flex flex-col items-start space-y-4 p-4">
      {/* 헤더 */}
      <SurveyHeader title="Q3. 나의 음식 취향 선택하기" description="자신의 음식 취향을 선택해 주세요.(최소 1개, 최대 3개)"/>

      {/* 진행 상태 바 */}
      <HorizontalProgressBar progress={(2.9 / 3) * 100}/>

      {/* 좋아하는 음식 선택 */}
      <div className="text-lg font-bold mb-2">좋아하는 음식</div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {likedFood.map((food) => (
          <button
            key={food}
            onClick={() => toggleLikedFood(food)}
            className={`py-3 px-8 rounded-full text-center border-2 border-brand-pink transition ${selectedLiked.includes(food) ? "bg-brand-pink" : "bg-white"}`}
          >
            {food}
          </button>
        ))}

        {!showAddFormLiked && (
          <button
            onClick={() => setShowAddFormLiked(true)}
            className="py-3 px-8 rounded-full text-center transition bg-brand-pink"
          >
            + 직접 입력
          </button>
        )}
      </div>

      {showAddFormLiked && (
        <div className="mt-4">
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink"
              autoFocus={true}
            />
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {errorLiked && <p className="text-red-500 text-sm mt-2">{errorLiked}</p>}

      {/* 싫어하는 음식 선택 */}
      <div className="text-lg font-bold mb-2 mt-4">싫어하는 음식</div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {dislikedFood.map((food) => (
          <button
            key={food}
            onClick={() => toggleDislikedFood(food)}
            className={`py-3 px-8 rounded-full text-center border-2 border-brand-pink transition ${selectedDisliked.includes(food) ? "bg-brand-pink" : "bg-white"}`}
          >
            {food}
          </button>
        ))}

        {!showAddFormDisliked && (
          <button
            onClick={() => setShowAddFormDisliked(true)}
            className="py-3 px-8 rounded-full text-center transition bg-brand-pink"
          >
            + 직접 입력
          </button>
        )}
      </div>

      {showAddFormDisliked && (
        <div className="mt-4">
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
              className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-pink"
              autoFocus={true}
            />
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {errorDisliked && <p className="text-red-500 text-sm mt-2">{errorDisliked}</p>}


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

export default SurveyFood