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
    <label className={styles.label}>
      <input
        ref={ref}
        className={styles.input}
        {...props}
        required
        autoComplete='off'
      />
      <span className={styles.placeholder}>{label}</span>
    </label>
  );
};

export default forwardRef(TextFieldUI);
