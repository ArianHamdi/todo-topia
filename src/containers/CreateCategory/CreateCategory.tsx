import { FormProvider, useForm } from 'react-hook-form';
import styles from './CreateCategory.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';

const CreateCategory = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
      color: '',
    },
  });

  return (
    <div>
      <h1>Add new category</h1>
      <FormProvider {...methods}>
        <TextField name='name' label='Category name' />
        <ColorPicker name='color' label='Color' />
      </FormProvider>
    </div>
  );
};

export default CreateCategory;
