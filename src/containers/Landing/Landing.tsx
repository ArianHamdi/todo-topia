import Category from '@/components/Category';
import { useCategories } from '@/hooks/api/category';
import styles from './Landing.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import FloatingActionButton from '@/components/FloatingActionButton';
import FloatingActionButtonItem from '@/components/FloatingActionButton/FloatingActionButtonItem';
import CategoryIcon from '@/assets/icons/category.svg';
import LinkButton from '@/components/LinkButton';

const Landing = () => {
  const { data } = useCategories();
  const { t } = useTranslation();

  const items = data?.map(category => (
    <Category key={category.id} {...category} />
  ));

  return (
    <div>
      <div className={styles.header}>
        <h1>{t('task_categories')}</h1>
        <LinkButton href='/create/category'>{t('new_category')}</LinkButton>
      </div>
      <div className={styles.categories}>{items}</div>
    </div>
  );
};

export default Landing;
