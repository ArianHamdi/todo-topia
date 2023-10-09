import { Properties } from 'csstype';
import styles from './Category.module.scss';
import Chip from '@/components/Chip';
import CircularProgressBar from '../CircularProgressBar';
import CircleFilled from '../CircleFilled';
import { ICategory } from '@/types';
import Link from 'next/link';
import { analyzeTodoLists } from '@/utils';
import { useTranslation } from '@/hooks/useTranslation';

const Category = ({ color, title, todoLists, id }: ICategory) => {
  const { t } = useTranslation();

  const { completed, left, totalTasks, completionPercentage } =
    analyzeTodoLists(todoLists);

  return (
    <Link href={'/category/' + id} className={styles.category}>
      <div className={styles.header}>
        <CircularProgressBar stroke={color} percentage={completionPercentage} />
        <CircleFilled background={color} size={10} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.tasks}>
        {totalTasks} {t('tasks')}
      </p>
      <div className={styles.chips}>
        <Chip variant='completed' count={completed} />
        <Chip variant='left' count={left} />
      </div>
    </Link>
  );
};

export default Category;
