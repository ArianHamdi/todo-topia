import axios from '@/lib/axios';
import {
  ICategory,
  ICategoryDelete,
  ICategoryEdit,
  ICategoryPost,
} from '@/types';

export const getCategories = async () => {
  const { data } = await axios.get<ICategory[]>('/category');
  return data;
};

export const createCategory = async (body: ICategoryPost) => {
  const { data } = await axios.post<ICategory>('/category', body);
  return data;
};

export const editCategory = async ({ id, ...body }: ICategoryEdit) => {
  const { data } = await axios.put<ICategory>('/category/' + id, body);
  return data;
};

export const deleteCategory = async ({ id }: ICategoryDelete) => {
  const { data } = await axios.delete<ICategory>('/category/' + id);
  return data;
};
