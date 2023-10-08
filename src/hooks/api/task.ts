import * as api from '@/api/task';
import { useMutation } from '@tanstack/react-query';
import { useTodoList } from './todo-list';

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

export const useCreateTask = () => {
  return useMutation({
    mutationFn: api.createTask,
  });
};

export const useEditTask = () => {
  return useMutation({
    mutationFn: api.editTask,
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: api.deleteTask,
  });
};
