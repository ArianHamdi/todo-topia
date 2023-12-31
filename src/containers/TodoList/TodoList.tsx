import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import styles from './TodoList.module.scss';
import { useCategory, useDeleteCategory } from '@/hooks/api/category';
import { useRouter } from '@/hooks/useRouter/useRouter';
import Delete from '@/assets/icons/delete.svg';
import Edit from '@/assets/icons/edit.svg';
import { usePopup } from '@/hooks/usePopup/usePopup';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import LinkButton from '@/components/LinkButton';
import Task from '@/components/Task';
import { useDeleteTodoList, useTodoList } from '@/hooks/api/todo-list';
import Header from '@/components/Header';
import { useBackButton } from '@/hooks/useBackButton';
import Spinner from '@/components/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

const TodoList = () => {
  const {
    query: { todoListId },
  } = useRouter();

  const { data, isLoading } = useTodoList(todoListId as string);
  useBackButton(!!data ? `/category/${data.categoryId}` : '/');
  const { open } = usePopup();
  const { t } = useTranslation();

  const { mutate } = useDeleteTodoList();

  if (isLoading) return <Spinner />;

  if (!data) return null;

  const deletePopupHandler = () => {
    open({
      message: t('delete_todo_list', { title: data.title }),
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
      <Header>
        <h1>{data.title}</h1>
        <div className={styles.menu}>
          <ContextMenu>
            <ContextMenuItem
              href={'/edit/todo-list/' + data.id}
              icon={<Edit width={20} height={20} />}
            >
              {t('edit')}
            </ContextMenuItem>
            <ContextMenuItem
              variant='danger'
              icon={<Delete width={20} height={20} />}
              onClick={deletePopupHandler}
            >
              {t('delete')}
            </ContextMenuItem>
          </ContextMenu>
        </div>
      </Header>
      <div className={styles.tasks}>
        <LinkButton href={`/create/todo-list/${todoListId}/task`}>
          {t('new_task')}
        </LinkButton>
        {data.tasks.length === 0 ? (
          <EmptyState />
        ) : (
          data.tasks.map(task => <Task key={task.id} {...task} />)
        )}
      </div>
    </div>
  );
};

export default TodoList;
