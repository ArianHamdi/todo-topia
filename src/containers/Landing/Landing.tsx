import Category from '@/components/Category';
import { useCategories } from '@/hooks/api/todo';
import styles from './Landing.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import FloatingActionButton from '@/components/FloatingActionButton';
import FloatingActionButtonItem from '@/components/FloatingActionButton/FloatingActionButtonItem';
import Add from '@/assets/icons/add.svg';

const Landing = () => {
  const { data } = useCategories();
  const { t } = useTranslation();

  const items = data?.map(category => (
    <Category key={category.id} {...category} />
  ));

  return (
    <div>
      <h1>{t('task_categories')}</h1>
      <div className={styles.categories}>{items}</div>
      <FloatingActionButton>
        <FloatingActionButtonItem
          label='new category'
          href='/create/category/'
          icon={<Add />}
        />
      </FloatingActionButton>
    </div>
  );
};

export default Landing;
