"use client"

import { useState } from "react"

export default function Survey() {
  const [progress, setProgress] = useState(25) // 진행률 (%)
  const [questionNumber, setQuestionNumber] = useState(2) // 질문 번호

  const handleNext = () => {
    // 다음 설문 페이지로 이동하거나 결과 저장 로직
    console.log("다음 질문으로 이동")
    // 여기에 다음 단계 로직 구현
  }

  const handlePrevious = () => {
    // 이전 설문 페이지로 이동
    console.log("이전 질문으로 이동")
    // 여기에 이전 단계 로직 구현
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      {/* 헤더 */}
      <h1 className="text-2xl font-bold mb-8">마롱</h1>

      {/* 질문 제목 */}
      <h2 className="text-2xl font-bold mb-2">Q{questionNumber}. 질문 제목</h2>
      <p className="text-lg mb-4">질문에 대한 설명이나 안내문을 입력하세요.</p>

      {/* 진행 상태 바 */}
      <div className="w-full h-2 bg-gray-100 rounded-full mb-10">
        <div className="h-full bg-pink-300 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>

      {/* 설문 내용 영역 */}
      <div className="flex-1 space-y-6">
        {/* 여기에 설문 내용을 추가하세요 */}
        {/* 예: 라디오 버튼, 체크박스, 텍스트 입력 등 */}
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-400 text-center">여기에 설문 내용이 들어갑니다.<br />다양한 유형의 질문을 추가할 수 있습니다.</p>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handlePrevious}
          className="flex-1 py-4 bg-gray-200 text-black font-medium rounded-full"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-4 bg-pink-300 text-black font-medium rounded-full"
        >
          다음
        </button>
      </div>
    </div>
  )
}
