import { ReactNode } from 'react';
import styles from './RootLayout.module.scss';

interface IProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  return <div className={styles.layout}>{children}</div>;
};

export default RootLayout;
