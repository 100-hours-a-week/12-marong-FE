function HorizontalProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-3 bg-gray-100 rounded-full">
      <div
        className="h-3 rounded-full bg-brown-light"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default HorizontalProgressBar;
