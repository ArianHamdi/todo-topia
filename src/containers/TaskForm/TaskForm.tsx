import { FormProvider, useForm } from 'react-hook-form';
import styles from './TaskForm.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton';
import { categorySchema } from '@/schema';
import { generateRandomHexColor } from '@/utils';
import {
  useCategory,
  useCreateCategory,
  useEditCategory,
} from '@/hooks/api/category';
import { useTranslation } from '@/hooks/useTranslation';
import { useClosingBehaviour } from '@/hooks/useClosingBehaviour';
import { IFormType } from '@/types';
import { useRouter } from '@/hooks/useRouter';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

interface IProps {
  type: IFormType;
}

const TaskForm = ({ type }: IProps) => {
  const {
    query: { id },
  } = useRouter();

  const { data: category, isLoading } = useCategory(id as string);

  const randomHexColor = useMemo(generateRandomHexColor, []);

  const methods = useForm({
    resolver: yupResolver(categorySchema),
    values: {
      title: category?.title ?? '',
      color: category?.color ?? randomHexColor,
    },
  });

  const { mutate: create, isLoading: isCreateLoading } = useCreateCategory();
  const { mutate: edit, isLoading: isEditLoading } = useEditCategory();

  const { t } = useTranslation();

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(data => {
    if (type === 'create') {
      create(data);
    } else {
      if (!category?.id) return;
      edit({ ...data, id: category.id });
    }
  });

  useMainButton({
    text: t(type),
    isEnabled: isValid,
    backgroundColor: '#22ff11',
    disableBackgroundColor: '#ff1133',
    isLoading: isCreateLoading || isEditLoading,
    onClick: onSubmit,
  });

  useClosingBehaviour(isValid);

  if (isLoading) return 'loading...';

  return (
    <div>
      <h1>{t('new_category')}</h1>
      <FormProvider {...methods}>
        <form>
          <TextField name='title' label='Category name' />
          <ColorPicker name='color' label='Color' />
        </form>
      </FormProvider>
    </div>
  );
};

export default TaskForm;
