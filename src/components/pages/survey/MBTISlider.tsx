import { useEffect, useRef, useState } from "react";

function MBTISlider({
  title,
  name,
  leftLabel,
  rightLabel,
  value,
  onChange,
  reversed = true,
}: {
  title: string;
  name: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (value: number) => void;
  reversed?: boolean;
}) {
  const [sliderValue, setSliderValue] = useState(value);
  const sliderRef = useRef(null);
  const leftPercentage = reversed ? 100 - sliderValue : sliderValue;
  const rightPercentage = 100 - leftPercentage;

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value);
    setSliderValue(newValue);
    if (onChange) onChange(newValue);
  };

  const getFillStyle = () => {
    if (sliderValue === 50) {
      return { width: "0%", left: "50%" };
    } else if (sliderValue > 50) {
      return {
        width: `${sliderValue - 50}%`,
        left: "50%",
      };
    } else {
      return {
        width: `${50 - sliderValue}%`,
        left: `${sliderValue}%`,
      };
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      {/* 제목 */}
      <div className="mb-2 text-lg font-bold">{title}</div>

      {/* 라벨 */}
      <div className="flex justify-between w-full">
        <div className="">{leftLabel}</div>
        <div className="">{rightLabel}</div>
      </div>

      <div className="relative justify-center items-center w-full h-3 bg-gray-100 rounded-full">
        {/* 게이지 */}
        <div className="relative mb-2 h-3 bg-gray-100 rounded-full">
          <div
            className="absolute h-full rounded-full bg-brown-light"
            style={getFillStyle()}
          ></div>
          <div
            className="absolute -mt-0 w-3 h-3 bg-white rounded-full border-2 transform -translate-x-1/2 border-brown-light"
            style={{ left: `${sliderValue}%` }}
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
          className="absolute left-0 top-1/2 z-10 w-full bg-transparent opacity-0 transform -translate-y-1/2 appearance-none"
        />
      </div>

      {/* 슬라이더 값 */}
      <div className="flex justify-between w-full">
        <div className="text-sm text-gray-500">{leftPercentage}%</div>
        <div className="text-sm text-gray-500">{rightPercentage}%</div>
      </div>
    </div>
  );
}

export default MBTISlider;
