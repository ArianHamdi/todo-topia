import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import styles from './Category.module.scss';
import NotFound from '@/components/NotFound';
import { useCategory, useDeleteCategory } from '@/hooks/api/category';
import { useRouter } from 'next/router';
import Delete from '@/assets/icons/delete.svg';
import Edit from '@/assets/icons/edit.svg';
import { usePopup } from '@/hooks/usePopup';
import { useTranslation } from '@/hooks/useTranslation';

const Category = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = useCategory(id as string);
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
    <div className={styles.header}>
      <h1>{data.title}</h1>
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
  );
};

export default Category;
