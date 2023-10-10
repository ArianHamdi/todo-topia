import { TextFieldUI, ITextFieldUI } from '@/components/FormUI';
import { useFormContext, useFormState } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import { IFormError, IFormErrorObj, RequiredName } from '@/types';

type IProps = RequiredName<ITextFieldUI>;

const TextField = ({ name, ...props }: IProps) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const { t } = useTranslation();

  const error = errors[name]?.message as unknown as IFormErrorObj;

  return (
    <div>
      <TextFieldUI {...props} {...register(name)} />
      <ErrorMessage>{error && t(error.key)}</ErrorMessage>
    </div>
  );
};

export default TextField;
