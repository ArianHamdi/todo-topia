import { Properties } from 'csstype';
import styles from './Category.module.scss';
import Chip from '@/components/Chip';
import CircularProgressBar from '../CircularProgressBar';
import CircleFilled from '../CircleFilled';
import { ICategory } from '@/types';

const Category = ({ color, title, todoLists }: ICategory) => {
  return (
    <div className={styles.category}>
      <div className={styles.header}>
        <CircularProgressBar stroke={color} percentage={66} />
        <CircleFilled background={color} size={4} />
      </div>
      <h3>{title}</h3>
      {/* <h4></h4> */}
    </div>
  );
};

export default Category;
