import { forwardRef } from 'react'

const CircleProgressBar = forwardRef(
  (
    {
      diameter = 200,
      strokeWidth = 15,
      color = 'var(--pomodoro-color)',
      backgroundColor = 'var(--pomodoro-background-color)',
    },
    ref,
  ) => {
    const radiusWithoutStroke = (diameter - strokeWidth) / 2
    const radius = diameter / 2

    return (
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <circle
          cx={radius}
          cy={radius}
          r={radiusWithoutStroke}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          ref={ref}
          cx={radius}
          cy={radius}
          r={radiusWithoutStroke}
          pathLength="1"
          fill="none"
          stroke={color}
          strokeWidth={`${strokeWidth}px`}
          strokeDasharray="1"
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
          style={{ transition: 'stroke 0.25s ease-in-out' }}
        />
      </svg>
    )
  },
)

export default CircleProgressBar
