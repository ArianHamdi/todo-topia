import styles from './EmptyState.module.scss';
import Icon from '@/assets/icons/bots.svg';

const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <div className={styles.message}>
        <Icon width={50} height={50} className={styles.icon} /> Empty!
      </div>
    </div>
  );
};

export default EmptyState;
