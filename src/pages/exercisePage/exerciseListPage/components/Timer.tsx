import React, { useEffect, useRef, useState } from "react";

type TimerProps = {
  onMinuteChange: (minute: number) => void;
};

const Timer: React.FC<TimerProps> = ({ onMinuteChange }) => {
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        const next = prev + 10;

        const minutes = Math.floor(next / 60000);
        onMinuteChange(minutes);

        return next;
      });
    }, 10);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onMinuteChange]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <h2 style={{ marginBottom: "0" }}>{formatTime(time)}</h2>
    </div>
  );
};

export default Timer;
