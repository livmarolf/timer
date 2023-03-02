import React, { useState } from 'react'

export const TimeInput = ({ value, onChange, emoji, ...props }) => {
  const [_value, setValue] = useState(value / 60 / 1000)

  const handleChange = (e) => {
    setValue(e.target.value)
    const time = +e.target.value
    if (time > 0) onChange(time * 60 * 1000)
  }

  return (
    <label {...props} className="time-input">
      {emoji}
      <input type="text" value={_value} onChange={handleChange} />
    </label>
  )
}
