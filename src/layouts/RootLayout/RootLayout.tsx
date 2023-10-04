import { ReactNode } from 'react';
import styles from './RootLayout.module.scss';
import { useBackButton } from '@/hooks/useBackButton';

interface IProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  useBackButton();

  return <div className={styles.layout}>{children}</div>;
};

export default RootLayout;
