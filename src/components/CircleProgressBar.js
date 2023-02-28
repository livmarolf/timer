const leadingZero = (n) => (n < 10 ? `0${n}` : n);

export default function CircleProgressBar({ duration, progress }) {
  const radius = 85;
  const circleWidth = "200";

  const remainingTime = duration * (1 - progress) / 1000;
  const minutes = leadingZero(Math.floor(remainingTime / 60));
  const seconds = leadingZero(Math.ceil(remainingTime % 60));
  const formatterTime = `${minutes}:${seconds}`;

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
          strokeDashoffset={progress}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className="circle-text"
        >
          {formatterTime}
        </text>
      </svg>
    </div>
  );
}
