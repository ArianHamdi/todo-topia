import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react';
import styles from './TextAreaUI.module.scss';

export interface ITextAreaUI
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextAreaUI = (
  { label, ...props }: ITextAreaUI,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <label className={styles.label}>
      <textarea
        ref={ref}
        className={styles.textarea}
        placeholder={label}
        {...props}
      />
    </label>
  );
};

export default forwardRef(TextAreaUI);
