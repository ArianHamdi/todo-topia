import { FormProvider, useForm } from 'react-hook-form';
import styles from './TaskForm.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton/useMainButton';
import { categorySchema, taskSchema } from '@/schema';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateTask, useEditTask, useTask } from '@/hooks/api/task';

interface IProps {
  type: IFormType;
}

const TaskForm = ({ type }: IProps) => {
  const {
    query: { todoListId, taskId },
    push,
  } = useRouter();

  const { data: task, isLoading } = useTask({
    todoListId: todoListId as string,
    taskId: taskId as string,
  });

  const methods = useForm({
    resolver: yupResolver(taskSchema),
    values: {
      title: task?.title ?? '',
      description: task?.description ?? '',
    },
  });

  const { mutate: create, isLoading: isCreateLoading } = useCreateTask(
    todoListId as string
  );
  const { mutate: edit, isLoading: isEditLoading } = useEditTask(
    todoListId as string
  );

  const { t } = useTranslation();

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(data => {
    if (type === 'create') {
      create(
        { ...data, todoListId: todoListId as string },
        {
          onSuccess: () => push('/todo-list/' + todoListId),
        }
      );
    } else {
      if (!task?.id) return;
      edit(
        { ...data, id: task.id },
        {
          onSuccess: () => push('/todo-list/' + todoListId),
        }
      );
    }
  });

  useMainButton({
    text: t(type),
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
          <TextField name='description' label={t('description')} />
        </form>
      </FormProvider>
    </div>
  );
};

export default TaskForm;
