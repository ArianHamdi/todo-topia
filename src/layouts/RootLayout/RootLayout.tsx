import { ReactNode } from 'react';
import styles from './RootLayout.module.scss';
import { Lato } from 'next/font/google';
import { useTheme } from '@/hooks/useTheme/useTheme';
import { useLocale } from '@/hooks/useLocale/useLocale';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
});

interface IProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IProps) => {
  useLocale();
  useTheme();

  return (
    <div className={lato.className}>
      <div className={styles.layout}>{children}</div>
    </div>
  );
};

export default RootLayout;
