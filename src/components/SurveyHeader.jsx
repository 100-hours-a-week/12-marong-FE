"use client"

function SurveyHeader({title, description}) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-xl font-bold text-left">{title}</div>
      <div className="text-gray-600 text-left ">{description}</div>
    </div>
  );
}

export default SurveyHeader;