import CircleProgressBar from "./CircleProgressBar";
import { useTimer, TimerState } from "../hooks/use-timer";

export default function Pomodoro() {
  const {
    progress,
    duration,
    toggleTimerState,
    timerState,
  } = useTimer();

  let buttonText = "";

  if (timerState === TimerState.INITIAL)
    buttonText = "Start";
  else if (timerState === TimerState.PAUSED)
    buttonText = "Resume";
  else if (timerState === TimerState.RUNNING)
    buttonText = "Pause";

  return (
    <div>
      <CircleProgressBar
        progress={progress}
        duration={duration}
      />
      <div>
        <button onClick={toggleTimerState}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
