import { MouseEvent, Ref, forwardRef } from 'react';
import More from '@/assets/icons/more.svg';
import styles from './ContextMenuToggle.module.scss';

interface IProps {
  onClick: () => void;
}

const ContextMenuToggle = ({ onClick }: IProps, ref: Ref<HTMLElement>) => {
  // return <More className={styles.more} />;

  return (
    <button className={styles.toggle} onClick={onClick}>
      <More className={styles.more} />
    </button>
  );
};

export default forwardRef(ContextMenuToggle);
