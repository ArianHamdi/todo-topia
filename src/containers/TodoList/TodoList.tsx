import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import styles from './TodoList.module.scss';
import NotFound from '@/components/NotFound';
import { useCategory, useDeleteCategory } from '@/hooks/api/category';
import { useRouter } from '@/hooks/useRouter';
import Delete from '@/assets/icons/delete.svg';
import Edit from '@/assets/icons/edit.svg';
import { usePopup } from '@/hooks/usePopup';
import { useTranslation } from '@/hooks/useTranslation';
import LinkButton from '@/components/LinkButton';
import Task from '@/components/Task';
import { useTodoList } from '@/hooks/api/todo-list';

const TodoList = () => {
  const {
    query: { todoListId },
  } = useRouter();

  const { data, isLoading } = useTodoList(todoListId as string);
  const { open } = usePopup();
  const { t } = useTranslation();

  const { mutate } = useDeleteCategory();

  if (isLoading) return 'loading ...';

  if (!data) return <NotFound />;

  const deletePopupHandler = () => {
    open({
      message: t('delete_category', { title: data.title }),
      title: t('delete'),
      buttons: [
        {
          type: 'destructive',
          text: t('delete'),
          id: 'confirm',
        },
        {
          type: 'cancel',
        },
      ],
      onConfirm: () => mutate({ id: data.id }),
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <h1>{data.title}</h1>
        <div className={styles.menu}>
          <ContextMenu>
            <ContextMenuItem href={'/edit/category/' + data.id} icon={<Edit />}>
              {t('edit')}
            </ContextMenuItem>
            <ContextMenuItem
              variant='danger'
              icon={<Delete />}
              onClick={deletePopupHandler}
            >
              {t('delete')}
            </ContextMenuItem>
          </ContextMenu>
        </div>
      </div>
      <LinkButton href={`/create/todo-list/${todoListId}/task`}>
        {t('new_task')}
      </LinkButton>
      <div className={styles.tasks}>
        {data.tasks.map(task => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
