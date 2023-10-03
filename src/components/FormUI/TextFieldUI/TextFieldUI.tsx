import { InputHTMLAttributes } from 'react';
import styles from './TextFieldUI.module.scss';

export interface ITextFieldUI extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextFieldUI = ({ label }: ITextFieldUI) => {
  return (
    <label className={styles.label}>
      <input className={styles.input} placeholder={label} />
    </label>
  );
};

export default TextFieldUI;
