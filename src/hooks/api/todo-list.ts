import * as api from '@/api/todo-list';
import { ICategory, ITodoList } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCategories, useCategory } from './category';

export const useTodoLists = (categoryId: string) => {
  const result = useCategory(categoryId);
  const data = result.data?.todoLists;

  return {
    ...result,
    data,
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
      router.push('/todo-list/' + data.id);
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
      queryClient.setQueryData<ICategory[]>(['categories'], prev => {
        return prev?.map(category => {
          if (category.id === variables.categoryId) {
            return {
              ...category,
              todoLists: category.todoLists.map(todoList => {
                if (todoList.id === variables.id) {
                  return {
                    ...todoList,
                    ...variables,
                  };
                } else {
                  return todoList;
                }
              }),
            };
          } else {
            return category;
          }
        });
      });

      // Redirect to landing page
      router.replace('/todo-list/' + variables.id);

      // Return a context object with the snapshot value
      return { snapshot };
    },
  });
};

//Should converted to Todo List with immer
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: api.deleteTodoList,
    onMutate: async ({ id }) => {
      // Snapshot the previous value
      const snapshot = queryClient.getQueryData<ITodoList[]>(['categories']);

      // Optimistically update to the new value
      queryClient.setQueryData<ITodoList[]>(['categories'], old => {
        return old?.filter(category => category.id !== id);
      });

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
