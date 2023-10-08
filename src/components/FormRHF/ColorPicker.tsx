import { ColorPickerUI, IColorPickerUI } from '@/components/FormUI';
import { useController } from 'react-hook-form';
import { RequiredName } from '@/types';

type IProps = RequiredName<Partial<IColorPickerUI>>;

const ColorPicker = ({ name, ...props }: IProps) => {
  const { field } = useController({ name });

  return (
    <div>
      <ColorPickerUI {...props} {...field} />
    </div>
  );
};

export default ColorPicker;
