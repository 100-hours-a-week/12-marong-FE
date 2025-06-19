function SurveyHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-2xl font-bold text-left">{title}</div>
      <div className="text-lg text-left text-gray-600">{description}</div>
    </div>
  );
}

export default SurveyHeader;
