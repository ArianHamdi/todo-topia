import { ContextMenu, ContextMenuItem } from '@/components/ContextMenu';
import styles from './Category.module.scss';
import NotFound from '@/components/NotFound';
import { useCategories } from '@/hooks/api/todo';
import { useRouter } from 'next/router';

const Category = () => {
  const {
    query: { id },
  } = useRouter();

  const { data, isLoading } = useCategories();

  const category = data?.find(category => category.id === id);

  if (isLoading) return 'loading ...';

  if (!category) return <NotFound />;

  return (
    <div className={styles.header}>
      <h1>{category.title}</h1>
      <ContextMenu>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>delete</ContextMenuItem>
      </ContextMenu>
    </div>
  );
};

export default Category;
