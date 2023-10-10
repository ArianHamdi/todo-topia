import { ITask } from '@/types';
import styles from './Task.module.scss';
import CheckboxUI from '../FormUI/CheckboxUI';
import { formatToDayMonthTime12H } from '@/utils/date';
import { useDeleteTask, useEditTask } from '@/hooks/api/task';
import Link from 'next/link';
import { MouseEvent } from 'react';
import Close from '@/assets/icons/close-circle.svg';
import { usePopup } from '@/hooks/usePopup/usePopup';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';

const Task = (props: ITask) => {
  const { id, status, title, description, deadline, todoListId } = props;

  const { mutate: editTask } = useEditTask(todoListId);
  const { mutate: deleteTask } = useDeleteTask(todoListId);

  const { t } = useTranslation();

  // const { open } = usePopup();

  const toggleHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    editTask({ ...props, status: !status });
  };

  const deleteHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // open({
    //   message: t('delete_task', { title: title }),
    //   title: t('delete'),
    //   buttons: [
    //     {
    //       type: 'destructive',
    //       text: t('delete'),
    //       id: 'confirm',
    //     },
    //     {
    //       type: 'cancel',
    //     },
    //   ],
    //   onConfirm: () => deleteTask({ id }),
    // });
  };

  return (
    <Link
      className={styles.task}
      href={`/edit/todo-list/${todoListId}/task/${id}`}
    >
      <div className={styles.header}>
        <CheckboxUI onClick={toggleHandler} checked={status} />
        <h3 className={styles.title}>{title}</h3>
        <Close
          className={styles.delete}
          onClick={deleteHandler}
          width={20}
          height={20}
        />
      </div>
      <div className={styles.footer}>
        <p>{description}</p>
        {deadline && <p>{formatToDayMonthTime12H(deadline)}</p>}
      </div>
    </Link>
  );
};

export default Task;
