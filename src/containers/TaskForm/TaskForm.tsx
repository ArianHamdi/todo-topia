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
import Header from '@/components/Header';
import { useBackButton } from '@/hooks/useBackButton';
import Spinner from '@/components/Spinner';

interface IProps {
  type: IFormType;
}

const TaskForm = ({ type }: IProps) => {
  const {
    query: { todoListId, taskId },
    push,
  } = useRouter();

  useBackButton(`/todo-list/${todoListId}`);

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

  if (type === 'edit' && isLoading) return <Spinner />;

  if (!task && type === 'edit') return null;

  return (
    <div>
      <Header>
        <h1>
          {type === 'create'
            ? t('new_task')
            : t('edit_task', { title: task?.title || '' })}
        </h1>
      </Header>
      <div className={styles.taskForm}>
        <FormProvider {...methods}>
          <form className={styles.form}>
            <TextField name='title' label={t('task_name')} />
            <TextField name='description' label={t('description')} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TaskForm;
