import Category from '@/components/Category';
import { useCategories } from '@/hooks/api/category';
import styles from './Landing.module.scss';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import LinkButton from '@/components/LinkButton';
import Profile from '@/components/Profile';
import { useBackButton } from '@/hooks/useBackButton';

const Landing = () => {
  useBackButton();
  const { data } = useCategories();
  const { t } = useTranslation();

  const items = data?.map(category => (
    <Category key={category.id} {...category} />
  ));

  return (
    <div className={styles.landing}>
      <Profile />
      <div className={styles.header}>
        <h1>{t('task_categories')}</h1>
        <LinkButton href='/create/category'>{t('new_category')}</LinkButton>
      </div>
      <div className={styles.categories}>{items}</div>
    </div>
  );
};

export default Landing;
