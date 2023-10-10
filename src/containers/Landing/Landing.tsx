import Category from '@/components/Category';
import { useCategories } from '@/hooks/api/category';
import styles from './Landing.module.scss';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import LinkButton from '@/components/LinkButton';
import Profile from '@/components/Profile';
import { useBackButton } from '@/hooks/useBackButton';
import Spinner from '@/components/Spinner';

const Landing = () => {
  useBackButton();
  const { data, isLoading } = useCategories();
  const { t } = useTranslation();

  const items = data?.map(category => (
    <Category key={category.id} {...category} />
  ));

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.landing}>
      <Profile />
      <div className={styles.header}>
        <h1>{t('task_categories')}</h1>
      </div>
      <LinkButton href='/create/category'>{t('new_category')}</LinkButton>
      <div className={styles.categories}>{items}</div>
    </div>
  );
};

export default Landing;
