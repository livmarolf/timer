import { useCallback, useEffect, useRef, useState } from 'react'
import { useWatcher } from './useWatcher'

export const TimerMode = {
  WORK: 'work',
  BREAK: 'break',
}

export const TimerState = {
  INITIAL: 'initial',
  PAUSED: 'paused',
  RUNNING: 'running',
  UPDATED: 'updated',
}

export const Duration = {
  [TimerMode.WORK]: 45 * 60 * 1000, // 45 minutes
  [TimerMode.BREAK]: 15 * 60 * 1000, // 15 minutes
}

export const useTimer = (onUpdate, workDuration, breakDuration) => {
  const startTime = useRef(0)
  const duration = useRef(Duration[TimerMode.WORK])
  const elapsedTime = useRef(0)
  const rafId = useRef()

  const [mode, setMode] = useState(TimerMode.WORK)
  const [timerState, setTimerState] = useState(TimerState.INITIAL)

  const resetTimer = useCallback(
    (nextMode) => {
      duration.current =
        nextMode === TimerMode.WORK
          ? workDuration ?? Duration[TimerMode.WORK]
          : breakDuration ?? Duration[TimerMode.BREAK]
      startTime.current = Date.now()
      elapsedTime.current = 0

      setMode(nextMode)
    },
    [workDuration, breakDuration],
  )

  useWatcher(
    (updatedKey) => {
      if (updatedKey === 'workDuration' && mode === TimerMode.WORK) {
        resetTimer(TimerMode.WORK)
        setTimerState(TimerState.UPDATED)
        onUpdate(0, duration.current)
      }
      if (updatedKey === 'breakDuration' && mode === TimerMode.BREAK) {
        resetTimer(TimerMode.BREAK)
        setTimerState(TimerState.UPDATED)
        onUpdate(0, duration.current)
      }
    },
    { workDuration, breakDuration },
    [workDuration, breakDuration, resetTimer, mode],
  )

  const updateTimer = useCallback(() => {
    rafId.current = requestAnimationFrame(updateTimer)

    if (timerState !== TimerState.RUNNING) return

    const updatedElapsedTime = Date.now() - startTime.current
    if (updatedElapsedTime >= duration.current) {
      const nextMode =
        mode === TimerMode.WORK ? TimerMode.BREAK : TimerMode.WORK

      resetTimer(nextMode)
    } else {
      elapsedTime.current = updatedElapsedTime
    }

    onUpdate(elapsedTime.current / duration.current, duration.current)
  }, [onUpdate, mode, timerState, resetTimer])

  useEffect(() => {
    requestAnimationFrame(updateTimer)
    return () => cancelAnimationFrame(rafId.current)
  }, [updateTimer, timerState])

  const toggleTimerState = () => {
    switch (timerState) {
      case TimerState.INITIAL:
        setTimerState(TimerState.RUNNING)
        startTime.current = Date.now()
        break
      case TimerState.PAUSED:
      case TimerState.UPDATED:
        setTimerState(TimerState.RUNNING)
        startTime.current = Date.now() - elapsedTime.current
        break
      case TimerState.RUNNING:
        setTimerState(TimerState.PAUSED)
        break
      default:
        throw new Error('Invalid timer state')
    }
  }

  return { mode, timerState, toggleTimerState }
}
