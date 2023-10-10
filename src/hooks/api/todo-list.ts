import * as api from '@/api/todo-list';
import { ICategory, ITodoList } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/hooks/useRouter/useRouter';
import { useCategories, useCategory } from './category';
import { produce } from 'immer';
import { findTodoListById } from '@/utils';

export const useTodoList = (todoListId: string) => {
  const result = useQuery({
    queryKey: ['todo-list', todoListId],
    queryFn: () => api.getTodoList(todoListId),
    enabled: !!todoListId,
  });

  return {
    ...result,
    isLoading: result.isLoading && result.fetchStatus !== 'idle',
  };
};

export const useCreateTodoList = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createTodoList,
    onSuccess: (data: ITodoList) => {
      queryClient.setQueryData<ICategory[]>(['categories'], prev => {
        if (!prev) return;
        return prev.map(category => {
          if (category.id === data.categoryId) {
            return {
              ...category,
              todoLists: [...category.todoLists, data],
            };
          } else {
            return category;
          }
        });
      });
      router.push(`/todo-list/${data.id}`);
    },
  });
};

export const useEditTodoList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: api.editTodoList,
    onMutate: async variables => {
      const snapshot = queryClient.getQueryData<ICategory[]>(['categories']);

      // Optimistically update to the new value
      queryClient.setQueryData<ICategory[]>(
        ['categories'],
        produce(draft => {
          const category = draft?.find(
            category => category.id === variables.categoryId
          );
          let todoList = category?.todoLists.find(
            todo => todo.id === variables.id
          );

          if (todoList) {
            todoList = { ...todoList, ...variables };
          }
        })
      );

      router.replace('/todo-list/' + variables.id);

      // Return a context object with the snapshot value
      return { snapshot };
    },
  });
};

//Should converted to Todo List with immer
export const useDeleteTodoList = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: api.deleteTodoList,
    onMutate: async ({ id }) => {
      // Snapshot the previous value
      const snapshot = queryClient.getQueryData<ICategory[]>(['categories']);

      // Optimistically update to the new value
      queryClient.setQueryData<ICategory[]>(['categories'], old => old);

      // Redirect to landing page
      router.replace('/');

      // Return a context object with the snapshot value
      return { snapshot };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['categories'], context?.snapshot);
    },
  });
};
