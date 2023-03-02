import classNames from 'classnames'
import { useCallback, useRef, useState } from 'react'
import { Duration, TimerState, useTimer, TimerMode } from '../hooks/use-timer'
import CircleProgressBar from './CircleProgressBar'

const leadingZero = (n) => (n < 10 ? `0${n}` : n)
const formatProgress = (progress, duration) => {
  const remainingTime = (duration * (1 - progress)) / 1000

  // format remaining time as hh:mm:ss
  const hours = leadingZero(Math.floor(remainingTime / 3600))
  const minutes = leadingZero(Math.floor((remainingTime % 3600) / 60))
  const seconds = leadingZero(Math.floor(remainingTime % 60))

  if (remainingTime < 5) return remainingTime.toFixed(1)

  return +hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`
}

export default function Pomodoro({ workDuration, breakDuration }) {
  console.log('workDuration, breakDuration :>> ', workDuration, breakDuration)
  const progressRef = useRef(null)
  const [remainingTime, setRemainingTime] = useState(
    formatProgress(0, Duration[TimerMode.WORK]),
  )

  const onUpdate = useCallback((progress, duration) => {
    progressRef.current.style.strokeDashoffset = progress
    setRemainingTime(formatProgress(progress, duration))
  }, [])

  const { mode, timerState, toggleTimerState } = useTimer(
    onUpdate,
    workDuration,
    breakDuration,
  )

  let buttonText = ''

  if (timerState === TimerState.INITIAL) buttonText = 'Start'
  else if (timerState === TimerState.PAUSED) buttonText = 'Resume'
  else if (timerState === TimerState.RUNNING) buttonText = 'Pause'
  else if (timerState === TimerState.UPDATED) buttonText = 'Restart'

  return (
    <button
      className={classNames('pomodoro', mode, {
        paused:
          timerState === TimerState.PAUSED || timerState === TimerState.UPDATED,
        initial:
          timerState === TimerState.INITIAL ||
          timerState === TimerState.UPDATED,
      })}
      onClick={toggleTimerState}
    >
      <CircleProgressBar ref={progressRef} />
      <div className="controls">
        <span className="mode">{mode === TimerMode.WORK ? '💪🏻' : '💤'}</span>
        <span
          className={classNames('time', {
            paused: timerState === TimerState.PAUSED,
          })}
        >
          {remainingTime}
        </span>

        <span className="state">{buttonText}</span>
      </div>
    </button>
  )
}
