import { ITodoList } from '@/types';
import styles from './TodoList.module.scss';
import Link from 'next/link';

const TodoList = ({
  id,
  title,
  categoryId,
  description,
  completed,
  left,
}: ITodoList) => {
  return (
    <Link href={`/todo-list/${id}`} className={styles.list}>
      <div className={styles.info}>
        <h3>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.stats}>
        {completed} / {left + completed}
      </div>
    </Link>
  );
};

export default TodoList;
