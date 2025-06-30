import { useEffect, useState } from "react";

const parseTimeToSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const formatSecondsToTime = (seconds: number) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${secs}`;
};

function CountdownTimer({ initialTime }: { initialTime: string }) {
  const [timeLeft, setTimeLeft] = useState(parseTimeToSeconds(initialTime));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [timeLeft]);

  return (
    <div className="text-[2.5rem] font-bold text-center text-brown-dark">
      {timeLeft > 0 ? `${formatSecondsToTime(timeLeft)}` : "00:00:00"}
    </div>
  );
}

export default CountdownTimer;
