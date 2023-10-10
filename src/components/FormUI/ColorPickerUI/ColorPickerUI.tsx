import { HexColorPicker } from 'react-colorful';
import styles from './ColorPickerUI.module.scss';
import { isColorDark } from '@tma.js/colors';
import { forwardRef } from 'react';
export interface IColorPickerUI {
  value: string;
  label?: string;
  onChange: (newColor: string) => void;
}

const ColorPickerUI = ({ value, label, ...props }: IColorPickerUI) => {
  return (
    <div className={styles.colorPicker}>
      <span>{label}</span>
      <div className={styles.hexColor}>
        <HexColorPicker color={value} {...props} />
        <div
          className={styles.preview}
          data-is-bg-dark={isColorDark(value)}
          style={{ backgroundColor: value }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ColorPickerUI);
