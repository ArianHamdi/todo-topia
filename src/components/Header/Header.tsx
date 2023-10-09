import { ReactNode } from 'react';
import styles from './Header.module.scss';

interface IProps {
  children: ReactNode;
}

const Header = ({ children }: IProps) => {
  return <div className={styles.header}>{children}</div>;
};

export default Header;
