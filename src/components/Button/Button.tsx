import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline';
  children: ReactNode;
}

const Button = ({
  children,
  className,
  variant = 'outline',
  ...props
}: IButton) => (
  <button className={styles.button} data-variant={variant} {...props}>
    {children}
  </button>
);

export default Button;
