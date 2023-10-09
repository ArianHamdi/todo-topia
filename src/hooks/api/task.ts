import * as api from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTodoList } from './todo-list';
import { ITodoList } from '@/types';
import { produce } from 'immer';
import { useRouter } from '@/hooks/useRouter';

export const useTask = ({
  todoListId,
  taskId,
}: {
  todoListId: string;
  taskId: string;
}) => {
  const result = useTodoList(todoListId);
  const data = result.data?.tasks.find(task => task.id === taskId);

  return {
    ...result,
    data,
  };
};

export const useCreateTask = (todoListId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.createTask,
    onSuccess: data => {
      queryClient.setQueryData<ITodoList>(
        ['todo-list', todoListId],
        produce(draft => {
          if (!draft) return;
          draft.tasks.push(data);
          draft.left++;
        })
      );
      queryClient.invalidateQueries(['categories']);
      router.push('/todo-list/' + todoListId);
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.editTask,
    onMutate: variables => {
      // const snapshot = queryClient.getQueryData<ITodoList>(['todo-list']);
    },
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: api.deleteTask,
  });
};
