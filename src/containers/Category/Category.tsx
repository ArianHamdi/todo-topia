import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import styles from './Category.module.scss';
import NotFound from '@/components/NotFound';
import { useCategories, useDeleteCategory } from '@/hooks/api/todo';
import { useRouter } from 'next/router';
import Delete from '@/assets/icons/delete.svg';
import Edit from '@/assets/icons/edit.svg';
import { usePopup } from '@/hooks/usePopup';
import { useTranslation } from '@/hooks/useTranslation';

const Category = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = useCategories();
  const { open } = usePopup();
  const { t } = useTranslation();

  const { mutate } = useDeleteCategory();

  const category = data?.find(category => category.id === id);

  if (isLoading) return 'loading ...';

  if (!category) return <NotFound />;

  const deletePopupHandler = () => {
    open({
      message: t('delete_category', { title: category.title }),
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
      onConfirm: () => mutate({ id: category.id }),
    });
  };

  return (
    <div className={styles.header}>
      <h1>{category.title}</h1>
      <ContextMenu>
        {/* <ContextMenuItem icon={<Edit />}>Edit</ContextMenuItem> */}
        <ContextMenuItem
          onClick={deletePopupHandler}
          variant='danger'
          icon={<Delete />}
        >
          {t('delete')}
        </ContextMenuItem>
      </ContextMenu>
    </div>
  );
};

export default Category;
