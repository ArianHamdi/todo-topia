import axios from '@/lib/axios';
import {
  ITodoList,
  ITodoListPost,
  ITodoListEdit,
  ITodoListDelete,
} from '@/types';

export const getCategories = async () => {
  const { data } = await axios.get<ITodoList[]>('/category');
  return data;
};

export const createCategory = async (body: ITodoListPost) => {
  const { data } = await axios.post<ITodoList>('/category', body);
  return data;
};

export const editCategory = async ({ id, ...body }: ITodoListEdit) => {
  const { data } = await axios.put<ITodoList>('/category/' + id, body);
  return data;
};

export const deleteCategory = async ({ id }: ITodoListDelete) => {
  const { data } = await axios.delete<ITodoList>('/category/' + id);
  return data;
};
