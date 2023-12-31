import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import styles from './Category.module.scss';
import { useCategory, useDeleteCategory } from '@/hooks/api/category';
import { useRouter } from '@/hooks/useRouter/useRouter';
import Delete from '@/assets/icons/delete.svg';
import Edit from '@/assets/icons/edit.svg';
import { usePopup } from '@/hooks/usePopup/usePopup';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import LinkButton from '@/components/LinkButton';
import TodoList from '@/components/TodoList';
import Header from '@/components/Header';
import { useBackButton } from '@/hooks/useBackButton';
import Spinner from '@/components/Spinner';
import EmptyState from '@/components/EmptyState/EmptyState';

const Category = () => {
  const {
    query: { categoryId },
  } = useRouter();

  useBackButton('/');

  const { data, isLoading } = useCategory(categoryId as string);
  const { open } = usePopup();
  const { t } = useTranslation();

  const { mutate } = useDeleteCategory();

  if (isLoading) return <Spinner />;

  if (!data) return null;

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
      <Header>
        <h1>{data.title}</h1>
        <div className={styles.menu}>
          <ContextMenu>
            <ContextMenuItem
              href={'/edit/category/' + data.id}
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
      <div className={styles.list}>
        <LinkButton href={`/create/category/${categoryId}/todo-list`}>
          {t('new_todo_list')}
        </LinkButton>
        {data.todoLists.length === 0 ? (
          <EmptyState />
        ) : (
          data?.todoLists?.map(todoList => (
            <TodoList key={todoList.id} {...todoList} />
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
