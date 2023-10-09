import { InputHTMLAttributes, MouseEventHandler } from 'react';
import styles from './CheckboxUI.module.scss';
import Check from '@/assets/icons/check.svg';

export interface ICheckboxUI
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onClick'> {
  onClick?: MouseEventHandler<HTMLLabelElement>;
}

const CheckboxUI = ({ onClick, ...other }: ICheckboxUI) => {
  return (
    <label className={styles.label} onClick={onClick}>
      <input className={styles.input} type='checkbox' {...other} />
      <div className={styles.checkbox}>
        <Check className={styles.check_icon} width={18} height={18} />
      </div>
    </label>
  );
};

export default CheckboxUI;
