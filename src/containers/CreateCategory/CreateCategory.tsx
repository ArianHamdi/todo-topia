import { FormProvider, useForm, useWatch } from 'react-hook-form';
import styles from './CreateCategory.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton';
import { joiResolver } from '@hookform/resolvers/joi';
import { categorySchema } from '@/schema';
import { generateRandomHexColor } from '@/utils';

const CreateCategory = () => {
  const methods = useForm({
    defaultValues: {
      title: '',
      color: generateRandomHexColor(),
    },
    resolver: joiResolver(categorySchema),
  });

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit((data, err) => {
    console.log('Data33', data);
    console.log('err33', err);
  });

  useMainButton({
    text: 'Create',
    isEnabled: isValid,
    backgroundColor: '#22ff11',
    disableBackgroundColor: '#ff1133',
    isLoading: true,
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
