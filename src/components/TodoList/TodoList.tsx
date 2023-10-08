import { ITodoList } from '@/types';
import styles from './TodoList.module.scss';

const TodoList = ({ title }: ITodoList) => {
  return <div className={styles.list}>{title}</div>;
};

export default TodoList;
