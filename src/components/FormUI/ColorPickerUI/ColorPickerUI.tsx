import { HexColorPicker } from 'react-colorful';

export interface IColorPickerUI {
  value: string;
  label?: string;
}

const ColorPickerUI = ({ value, label, ...props }: IColorPickerUI) => {
  return (
    <div>
      <span>{label}</span>
      <HexColorPicker color={value} {...props} />
    </div>
  );
};

export default ColorPickerUI;
