import { FormProvider, useForm } from 'react-hook-form';
import styles from './TaskForm.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton';
import { categorySchema, taskSchema } from '@/schema';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateTask, useEditTask, useTask } from '@/hooks/api/task';

interface IProps {
  type: IFormType;
}

const TaskForm = ({ type }: IProps) => {
  const {
    query: { todoListId, taskId },
  } = useRouter();

  const { data: task, isLoading } = useTask({
    todoListId: todoListId as string,
    taskId: taskId as string,
  });

  const methods = useForm({
    resolver: yupResolver(taskSchema),
    // values: {

    // },
  });

  const { mutate: create, isLoading: isCreateLoading } = useCreateTask();
  const { mutate: edit, isLoading: isEditLoading } = useEditTask();

  const { t } = useTranslation();

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(data => {
    if (type === 'create') {
      create(data);
    } else {
      if (!task?.id) return;
      edit({ ...data, id: task.id });
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
          <TextField name='title' label={t('task_name')} />
        </form>
      </FormProvider>
    </div>
  );
};

export default TaskForm;
