import { ReactNode, MouseEvent } from 'react';
import styles from './ContextMenuItem.module.scss';

export interface IContextMenuItem {
  variant?: 'info' | 'danger';
  children: ReactNode;
  icon: ReactNode;
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
}

const ContextMenuItem = ({
  variant = 'info',
  icon,
  children,
  onClick,
}: IContextMenuItem) => {
  return (
    <li className={styles.item} data-variant={variant} onClick={onClick}>
      {icon}
      <span className={styles.label}>{children}</span>
    </li>
  );
};

export default ContextMenuItem;
