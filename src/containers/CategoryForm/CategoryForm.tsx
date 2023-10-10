import { FormProvider, useForm, useWatch } from 'react-hook-form';
import styles from './CategoryForm.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton/useMainButton';
import { categorySchema } from '@/schema';
import { generateRandomHexColor } from '@/utils';
import {
  useCategory,
  useCreateCategory,
  useEditCategory,
} from '@/hooks/api/category';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import { useClosingBehaviour } from '@/hooks/useClosingBehaviour/useClosingBehaviour';
import { IFormType } from '@/types';
import { useRouter } from '@/hooks/useRouter/useRouter';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from '@/components/Header';
import { useBackButton } from '@/hooks/useBackButton';
import NotFound from '@/components/NotFound';

interface IProps {
  type: IFormType;
}

const CategoryForm = ({ type }: IProps) => {
  const {
    query: { categoryId },
  } = useRouter();

  useBackButton(type === 'create' ? '/' : `/${categoryId}`);

  const { data: category, isLoading } = useCategory(categoryId as string);

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
    isLoading: isCreateLoading || isEditLoading,
    onClick: onSubmit,
  });

  useClosingBehaviour(isValid);

  if (isLoading) return 'loading...';

  if (!category && type === 'edit') return <NotFound />;

  return (
    <div>
      <Header>
        <h1>
          {type === 'create'
            ? t('new_category')
            : t('edit_category', { title: category?.title || '' })}
        </h1>
      </Header>
      <div className={styles.categoryForm}>
        <FormProvider {...methods}>
          <form className={styles.form}>
            <TextField name='title' label={t('category_name')} />
            <ColorPicker name='color' label={t('color')} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CategoryForm;
