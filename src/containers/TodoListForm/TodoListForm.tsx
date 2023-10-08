import { FormProvider, useForm } from 'react-hook-form';
import styles from './TodoListForm.module.scss';
import { ColorPicker, TextField } from '@/components/FormRHF';
import { useMainButton } from '@/hooks/useMainButton';
import { todoListSchema } from '@/schema';
import { useTranslation } from '@/hooks/useTranslation';
import { useClosingBehaviour } from '@/hooks/useClosingBehaviour';
import { IFormType } from '@/types';
import { useRouter } from '@/hooks/useRouter';
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
    query: { categoryId, todoListId },
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
    console.log('data333', data);
    if (type === 'create') {
      create(data);
    } else {
      if (!todoList?.id) return;
      edit({ ...data, id: todoList.id });
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
      <h1>{t('new_todo_list')}</h1>
      <FormProvider {...methods}>
        <form>
          <TextField name='title' label={t('todo_list_name')} />
        </form>
      </FormProvider>
    </div>
  );
};

export default TodoListForm;
