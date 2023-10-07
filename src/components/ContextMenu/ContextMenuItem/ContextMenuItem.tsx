import { ReactNode, MouseEvent } from 'react';
import styles from './ContextMenuItem.module.scss';
import Link, { LinkProps } from 'next/link';

interface IProps {
  variant?: 'info' | 'danger';
  children: ReactNode;
  icon: ReactNode;
}

interface IPropsWithOnClick extends IProps {
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
  href?: never;
}

interface IPropsWithHref extends IProps {
  href: LinkProps['href'];
  onClick?: never;
}

export type IContextMenuItem = IPropsWithOnClick | IPropsWithHref;

const ContextMenuItem = ({
  variant = 'info',
  icon,
  children,
  href,
  onClick,
}: IContextMenuItem) => {
  const content = (
    <li onClick={onClick} className={styles.item} data-variant={variant}>
      {icon}
      <span className={styles.label}>{children}</span>
    </li>
  );

  if (href) return <Link href={href}>{content}</Link>;

  return content;
};

export default ContextMenuItem;
