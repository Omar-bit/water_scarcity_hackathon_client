const CircularProgress = ({
  min,
  max,
  val,
  color,
  size,
  showNumber,
  withoutProgress,
}) => {
  showNumber = showNumber || false;
  withoutProgress = withoutProgress || false;
  const progressColor = color || '#16423C';
  const radius = size || 75;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = ((val - min) / (max - min)) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke='lightgrey'
        fill='transparent'
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={withoutProgress ? 'transparent' : progressColor}
        fill='transparent'
        strokeWidth={stroke}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        strokeLinecap='round'
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x='50%'
        y='50%'
        dy='.3em'
        textAnchor='middle'
        fontSize='20px'
        fill='black'
      >
        {showNumber ? val : Math.round(progress) + '%'}
      </text>
    </svg>
  );
};

export default CircularProgress;
