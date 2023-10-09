import { InputHTMLAttributes } from 'react';
import styles from './CheckboxUI.module.scss';
import Check from '@/assets/icons/check.svg';

const CheckboxUI = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <label className={styles.label}>
      <input className={styles.input} type='checkbox' {...props} />
      <div className={styles.checkbox}>
        <Check className={styles.check_icon} width={20} height={20} />
      </div>
    </label>
  );
};

export default CheckboxUI;
