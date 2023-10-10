import styles from './CircularProgressBar.module.scss';
import { Properties } from 'csstype';

export interface IProps {
  percentage: number;
  stroke: Properties['stroke'];
}

const CircularProgressBar = ({ percentage, stroke }: IProps) => {
  const radius = 18;
  const radiusWithStroke = 20 + 2;
  const diameter = 2 * radiusWithStroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.circularProgressBar}>
      <svg width={diameter} height={diameter}>
        <circle
          className={styles.progressCircle}
          r={radius}
          cx={radiusWithStroke}
          cy={radiusWithStroke}
          fill='transparent'
        />
        <circle
          className={styles.progressFill}
          r={radius}
          cx={radiusWithStroke}
          cy={radiusWithStroke}
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={stroke}
        />
        <text
          x={radiusWithStroke}
          y={radiusWithStroke}
          className={styles.percentageLabel}
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
