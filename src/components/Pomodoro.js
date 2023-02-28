import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import CircleProgressBar from "./CircleProgressBar";

export default function Pomodoro() {
  const settingsInfo = useContext(SettingsContext);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("break");
  const [isPaused, setIsPaused] = useState(true);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  const totalSeconds =
    mode === "work"
      ? settingsInfo.workDuration * 60
      : settingsInfo.breakDuration * 60;
  const percentage = (secondsLeft / totalSeconds) * 100;

  useEffect(() => {
    function switchMode() {
      const nextMode = mode === "work" ? "break" : "work";
      const nextTimeInSeconds =
        (nextMode === "work"
          ? settingsInfo.workDuration
          : settingsInfo.breakDuration) * 60;

      setMode(nextMode);
      setSecondsLeft(nextTimeInSeconds);
    }

    const interval = setInterval(() => {
      if (isPaused) {
        return;
      }

      if (secondsLeft === 0) {
        return switchMode();
      }

      setSecondsLeft((prev) => prev - 1);
    }, 100);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused, mode, settingsInfo]);

  return (
    <div>
      <CircleProgressBar
        percentage={percentage}
        time={minutes + ":" + seconds}
      />
      <div>
        <button onClick={() => setIsPaused((p) => !p)}>
          {isPaused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}
