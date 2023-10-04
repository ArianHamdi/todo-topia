import { ReactNode } from 'react';
import styles from './ContextMenuItem.module.scss';

export interface IContextMenuItem {
  variant?: 'info' | 'danger';
  children: ReactNode;
  icon?: ReactNode;
}

const ContextMenuItem = ({ variant = 'info', children }: IContextMenuItem) => {
  return <li>{children}</li>;
};

export default ContextMenuItem;
