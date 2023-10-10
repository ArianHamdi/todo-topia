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
import Header from '@/components/Header';
import { useBackButton } from '@/hooks/useBackButton';
import NotFound from '@/components/NotFound';

interface IProps {
  type: IFormType;
}

const TodoListForm = ({ type }: IProps) => {
  const {
    query: { todoListId, categoryId },
  } = useRouter();

  useBackButton(
    type === 'create' ? `/category/${categoryId}` : `/todo-list/${todoListId}`
  );

  const { data: todoList, isLoading } = useTodoList(todoListId as string);

  const methods = useForm({
    resolver: yupResolver(todoListSchema),
    values: {
      title: todoList?.title ?? '',
      description: todoList?.description ?? '',
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
    if (type === 'create' && data.categoryId) {
      create({ ...data, categoryId: data.categoryId });
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

  if (!todoList && type === 'edit') return <NotFound />;

  return (
    <div>
      <Header>
        <h1>
          {type === 'create'
            ? t('new_todo_list')
            : t('edit_todo_list', { title: todoList?.title || '' })}
        </h1>
      </Header>
      <div className={styles.todoListForm}>
        <FormProvider {...methods}>
          <form className={styles.form}>
            <TextField name='title' label={t('todo_list_name')} />
            <TextField name='description' label={t('description')} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TodoListForm;
