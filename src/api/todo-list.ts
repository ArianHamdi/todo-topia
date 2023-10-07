import axios from '@/lib/axios';
import {
  ITodoList,
  ITodoListPost,
  ITodoListEdit,
  ITodoListDelete,
} from '@/types';

export const createTodoList = async (body: ITodoListPost) => {
  const { data } = await axios.post<ITodoList>('/todoList', body);
  return data;
};

export const editTodoList = async ({ id, ...body }: ITodoListEdit) => {
  const { data } = await axios.put<ITodoList>('/todoList/' + id, body);
  return data;
};

export const deleteTodoList = async ({ id }: ITodoListDelete) => {
  const { data } = await axios.delete<ITodoList>('/todoList/' + id);
  return data;
};
