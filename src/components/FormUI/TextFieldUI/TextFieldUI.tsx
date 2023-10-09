import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import styles from './TextFieldUI.module.scss';

export interface ITextFieldUI extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextFieldUI = (
  { label, ...props }: ITextFieldUI,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className={styles.formItem}>
      <input
        ref={ref}
        className={styles.input}
        {...props}
        required
        autoComplete='off'
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};

export default forwardRef(TextFieldUI);
