import { Properties } from 'csstype';
import styles from './CircleFilled.module.scss';

interface IProps {
  background: Properties['backgroundColor'];
  size: number;
}

const CircleFilled = ({ background, size }: IProps) => {
  return (
    <div
      className={styles.color}
      style={{ width: size, height: size, backgroundColor: background }}
    ></div>
  );
};

export default CircleFilled;
