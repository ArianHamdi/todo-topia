import { ColorPickerUI } from '@/components/FormUI';
import { useController, useFormContext, useFormState } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useTranslation } from '@/hooks/useTranslation';
import type { IColorPickerUI } from '@/components/FormUI/ColorPickerUI';
import { RequiredName } from '@/types';

type IProps = RequiredName<Partial<IColorPickerUI>>;

const ColorPicker = ({ name, ...props }: IProps) => {
  const { field } = useController({ name });
  const { errors } = useFormState({ name });
  const { t } = useTranslation();

  const error = errors[name]?.message;

  return (
    <div>
      <ColorPickerUI {...props} {...field} />
      {/* <ErrorMessage>{t(error?.key, error?.values)}</ErrorMessage> */}
    </div>
  );
};

export default ColorPicker;
