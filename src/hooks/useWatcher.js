import { useRef, useEffect } from 'react'

export const useWatcher = (watcher, targets, deps) => {
  const previousValue = useRef({ ...targets })

  useEffect(() => {
    watcher(
      Object.keys(targets).find((key) => {
        return targets[key] !== previousValue.current[key]
      }),
    )
    previousValue.current = { ...targets }
  }, [watcher, ...deps]) // eslint-disable-line react-hooks/exhaustive-deps
}
