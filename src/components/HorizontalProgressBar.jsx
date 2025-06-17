"use client"

function HorizontalProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-3">
      <div
        className="bg-brand-brown_light h-3 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default HorizontalProgressBar;