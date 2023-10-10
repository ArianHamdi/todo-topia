import { TextAreaUI, ITextAreaUI } from '@/components/FormUI';
import { useFormContext, useFormState } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import { IFormError, RequiredName } from '@/types';

type IProps = RequiredName<ITextAreaUI>;

const TextField = ({ name, ...props }: IProps) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const { t } = useTranslation();

  const error = errors[name]?.message as IFormError;

  return (
    <div>
      <TextAreaUI {...props} {...register(name)} />
      <ErrorMessage>{error && t(error)}</ErrorMessage>
    </div>
  );
};

export default TextField;
