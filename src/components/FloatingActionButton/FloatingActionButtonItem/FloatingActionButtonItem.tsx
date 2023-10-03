import Link, { LinkProps } from 'next/link';
import styles from './FloatingActionButtonItem.module.scss';
import { ReactNode } from 'react';

interface IProps extends LinkProps {
  label: string;
  icon: ReactNode;
}

const FloatingActionButtonItem = ({ href, label, icon }: IProps) => {
  return (
    <li>
      <Link href={href} className={styles.item}>
        {/* <span>{label}</span> */}
        <div className={styles.circle}>{icon}</div>
      </Link>
    </li>
  );
};

export default FloatingActionButtonItem;
