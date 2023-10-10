import { FormProvider, useForm } from 'react-hook-form';
import styles from './TodoListForm.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton/useMainButton';
import { todoListSchema } from '@/schema';
import { useTranslation } from '@/hooks/useTranslation/useTranslation';
import { useClosingBehaviour } from '@/hooks/useClosingBehaviour/useClosingBehaviour';
import { IFormType } from '@/types';
import { useRouter } from '@/hooks/useRouter/useRouter';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCreateTodoList,
  useEditTodoList,
  useTodoList,
} from '@/hooks/api/todo-list';

interface IProps {
  type: IFormType;
}

const TodoListForm = ({ type }: IProps) => {
  const {
    query: { todoListId, categoryId },
  } = useRouter();

  const { data: todoList, isLoading } = useTodoList(todoListId as string);

  const methods = useForm({
    resolver: yupResolver(todoListSchema),
    values: {
      title: todoList?.title ?? '',
      categoryId: categoryId as string,
    },
  });

  const { mutate: create, isLoading: isCreateLoading } = useCreateTodoList();
  const { mutate: edit, isLoading: isEditLoading } = useEditTodoList();

  const { t } = useTranslation();

  const {
    formState: { isValid },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(data => {
    if (type === 'create') {
      create(data);
    } else {
      if (!todoList?.id) return;
      edit({ ...data, id: todoList.id });
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
      <h1>{t('new_todo_list')}</h1>
      <FormProvider {...methods}>
        <form>
          <TextField name='title' label={t('todo_list_name')} />
          <TextField name='description' label={t('description')} />
        </form>
      </FormProvider>
    </div>
  );
};

export default TodoListForm;
