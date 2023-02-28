import { useEffect, useRef } from "react";
import { useForceRerender } from "./use-force-rerender";

export const TimerMode = {
    WORK: "work",
    BREAK: "break",
}

export const TimerState = {
    INITIAL: "initial",
    PAUSED: "paused",
    RUNNING: "running",
}

const Duration = {
    /*  WORK: 45 * 60 * 1000, // 45 minutes
     BREAK: 15 * 60 * 1000, // 15 minutes */
    [TimerMode.WORK]: 10 * 1000,
    [TimerMode.BREAK]: 5 * 1000,
}

export const useTimer = () => {
    /*
      Forcing a rerender is generally not a good idea, but in this case it's
      the easiest way to update the timer.

      Ideally, we wouldn't use react's update mechanism to drive our animation. Instead,
      we could update the svg directly, bypassing the need for a rerender, or we could
      render the timer using a canvas element.
    */
    const forceRerender = useForceRerender();

    const startTime = useRef(0);
    const elapsedTime = useRef(0);
    const duration = useRef(Duration[TimerMode.WORK]);
    const mode = useRef(TimerMode.WORK);
    const timerState = useRef(TimerState.INITIAL);
    const rafId = useRef();

    const updateTimer = () => {
        rafId.current = requestAnimationFrame(updateTimer)

        if (timerState.current !== TimerState.RUNNING) return;


        const updatedElapsedTime = Date.now() - startTime.current;

        if (updatedElapsedTime >= duration.current) {
            mode.current = (mode.current === TimerMode.WORK ? TimerMode.BREAK : TimerMode.WORK);
            duration.current = Duration[mode.current];
            startTime.current = (Date.now());
            elapsedTime.current = 0;
        } else {
            elapsedTime.current = updatedElapsedTime;
        }

        forceRerender();
    };

    const toggleTimerState = () => {
        switch (timerState.current) {
            case TimerState.INITIAL:
                timerState.current = TimerState.RUNNING;
                startTime.current = Date.now();
                break;
            case TimerState.PAUSED:
                timerState.current = TimerState.RUNNING;
                startTime.current = Date.now() - elapsedTime.current;
                break;
            case TimerState.RUNNING:
                timerState.current = TimerState.PAUSED;
                break;
            default:
                throw new Error("Invalid timer state");
        }

        forceRerender();
    };

    useEffect(() => {
        requestAnimationFrame(updateTimer);
        return () => cancelAnimationFrame(rafId.current)
    }, []);

    return {
        progress: elapsedTime.current / duration.current,
        duration: duration.current,
        toggleTimerState,
        timerState: timerState.current,
    }
}
