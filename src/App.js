import Pomodoro from './components/Pomodoro'
import { Duration, TimerMode } from './hooks/use-timer'
import { useState } from 'react'
import { TimeInput } from './components/TimeInput'
import './styles/main.scss'

function App() {
  const [workDuration, setWorkDuration] = useState(Duration[TimerMode.WORK])
  const [breakDuration, setBreakDuration] = useState(Duration[TimerMode.BREAK])

  return (
    <div className="App">
      <Pomodoro workDuration={workDuration} breakDuration={breakDuration} />
      <TimeInput
        emoji={'💪🏻'}
        style={{ gridArea: 'time-input-work' }}
        value={workDuration}
        onChange={setWorkDuration}
      />
      <TimeInput
        emoji={'💤'}
        style={{ gridArea: 'time-input-break' }}
        value={breakDuration}
        onChange={setBreakDuration}
      />
    </div>
  )
}

export default App
