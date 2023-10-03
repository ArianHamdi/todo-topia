import { ReactNode } from 'react';
import styles from './ErrorMessage.module.scss';

interface IProps {
  children: ReactNode;
}

function ErrorMessage({ children }: IProps) {
  return <span className={styles.error}>{children}</span>;
}

export default ErrorMessage;
