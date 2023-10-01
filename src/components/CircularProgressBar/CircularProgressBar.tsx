import styles from './CircularProgressBar.module.scss';
import { Properties } from 'csstype';

interface IProps {
  percentage: number;
  stroke: Properties['stroke'];
}

const CircularProgressBar = ({ percentage, stroke }: IProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={styles.circularProgressBar}>
      <svg width='100' height='100'>
        <circle
          className={styles.progressCircle}
          cx='50'
          cy='50'
          r={radius}
          fill='transparent'
        />
        <circle
          className={styles.progressFill}
          cx='50'
          cy='50'
          r={radius}
          fill='transparent'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          stroke={stroke}
        />
        <text
          x='50'
          y='50'
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
