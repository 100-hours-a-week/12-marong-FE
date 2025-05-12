"use client"

import {useEffect, useRef, useState} from "react";

function MBTISlider({title, name, leftLabel, rightLabel, value, onChange, reversed = true}) {
  const [sliderValue, setSliderValue] = useState(value)
  const sliderRef = useRef(null)
  const leftPercentage = reversed ? 100 - sliderValue : sliderValue
  const rightPercentage = 100 - leftPercentage

  // 슬라이더 값이 변경될 때 부모 컴포넌트에 알림
  useEffect(() => {
    setSliderValue(value)
  }, [value])

  const handleChange = (e) => {
    const newValue = Number.parseInt(e.target.value)
    setSliderValue(newValue)
    if (onChange) onChange(newValue)
  }

  // 게이지 스타일 계산 - 50%를 기준으로 더 높은 쪽으로 채워짐
  const getFillStyle = () => {
    if (sliderValue === 50) {
      return {width: "0%", left: "50%"}
    } else if (sliderValue > 50) {
      return {
        width: `${sliderValue - 50}%`,
        left: "50%",
      }
    } else {
      return {
        width: `${50 - sliderValue}%`,
        left: `${sliderValue}%`,
      }
    }
  }

  return (
    <div className="flex flex-col items-start space-y-2">
      {/* 제목 */}
      <div className="text-lg font-bold mb-2">{title}</div>

      {/* 라벨 */}
      <div className="flex w-full justify-between">
        <div className="">{leftLabel}</div>
        <div className="">{rightLabel}</div>
      </div>

      <div className="relative w-full h-3 bg-gray-100 items-center rounded-full justify-center">
        {/* 게이지 */}
        <div className="relative h-3 bg-gray-100 rounded-full mb-2">
          <div className="absolute h-full rounded-full bg-brand-pink" style={getFillStyle()}></div>
          <div
            className="absolute w-3 h-3 bg-white border-2 border-brand-pink rounded-full -mt-0 transform -translate-x-1/2"
            style={{left: `${sliderValue}%`}}
          ></div>
        </div>

        {/* 슬라이더 */}
        <input
          ref={sliderRef}
          name={name}
          type="range"
          min="0"
          max="100"
          step="5"
          value={sliderValue}
          onChange={handleChange}
          className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 z-10 bg-transparent appearance-none opacity-0"
        />
      </div>

      {/* 슬라이더 값 */}
      <div className="flex w-full justify-between">
        <div className="text-sm text-gray-500">{leftPercentage}%</div>
        <div className="text-sm text-gray-500">{rightPercentage}%</div>
      </div>
    </div>
  )
}

export default MBTISlider