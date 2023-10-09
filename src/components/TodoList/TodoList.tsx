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
      <div>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <p className={styles.description}>
          jfsdjfalsdjflasfj;sdljflasjflsajfldsflka
        </p>
      </div>
      <div className={styles.details}>0 / 0</div>
    </Link>
  );
};

export default TodoList;
