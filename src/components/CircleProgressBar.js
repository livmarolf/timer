export default function CircleProgressBar({ percentage, time }) {
  const radius = 85;
  const circleWidth = "200";

  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circle-background"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="15px"
          r={radius}
          className="circle-progress"
          pathLength="1"
          strokeDasharray="1"
          style={{
            transition: "stroke-dashoffset linear 15ms",
          }}
          strokeDashoffset={1 - percentage}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="circle-text"
        >
          {time}
        </text>
      </svg>
    </div>
  );
}
