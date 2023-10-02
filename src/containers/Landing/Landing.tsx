import Category from '@/components/Category';
import { useCategories } from '@/hooks/api/todo';
import styles from './Landing.module.scss';
import { useTranslations } from '@/hooks/useTranslations';

const Landing = () => {
  const { data } = useCategories();
  const { t } = useTranslations();

  const items = data?.map(category => (
    <Category key={category.id} {...category} />
  ));

  return (
    <div>
      <h1>{t('task_categories')}</h1>
      <div className={styles.categories}>{items}</div>
    </div>
  );
};

export default Landing;
