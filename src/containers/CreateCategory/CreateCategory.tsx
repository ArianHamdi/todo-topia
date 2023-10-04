import { FormProvider, useForm, useWatch } from 'react-hook-form';
import styles from './CreateCategory.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton';
import { joiResolver } from '@hookform/resolvers/joi';
import { categorySchema } from '@/schema';
import { generateRandomHexColor } from '@/utils';
import { useCreateCategory } from '@/hooks/api/todo';
import { useTranslation } from '@/hooks/useTranslation';

const CreateCategory = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      color: generateRandomHexColor(),
    },
    resolver: joiResolver(categorySchema),
  });

  const { mutate, isLoading } = useCreateCategory();

  const { t } = useTranslation();

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(data => mutate(data));

  useMainButton({
    text: t('create'),
    isEnabled: isValid,
    backgroundColor: '#22ff11',
    disableBackgroundColor: '#ff1133',
    isLoading: isLoading,
    onClick: onSubmit,
  });

  return (
    <div>
      <h1>Add new category</h1>
      <FormProvider {...methods}>
        <TextField name='title' label='Category name' />
        <ColorPicker name='color' label='Color' />
      </FormProvider>
    </div>
  );
};

export default CreateCategory;
