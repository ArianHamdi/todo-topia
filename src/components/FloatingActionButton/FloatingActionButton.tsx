import { ReactNode, useState } from 'react';
import styles from './FloatingActionButton.module.scss';
import Add from '@/assets/icons/add.svg';

interface IProps {
  children: ReactNode;
}

const FloatingActionButton = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(prev => !prev);
  };

  return (
    // <div className={styles.backdrop} data-is-open={isOpen}>
    <div onClick={toggleHandler} className={styles.button}>
      <Add className={styles.icon} />
      {isOpen && <ul className={styles.list}>{children}</ul>}
    </div>
    // </div>
  );
};

export default FloatingActionButton;
