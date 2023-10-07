import axios from '@/lib/axios';
import {
  ICategory,
  ICategoryDelete,
  ICategoryEdit,
  ICategoryPost,
} from '@/types';
import { AxiosResponse } from 'axios';

export const getCategories = async () => {
  const { data } = await axios.get<ICategory[]>('/category');
  return data;
};

export const createCategory = async ({ title, color }: ICategoryPost) => {
  const { data } = await axios.post<
    ICategory,
    AxiosResponse<ICategory>,
    ICategoryPost
  >('/category', {
    title,
    color,
  });
  return data;
};

export const editCategory = async ({ color, title, id }: ICategoryEdit) => {
  const { data } = await axios.put<ICategory>('/category/' + id, {
    title,
    color,
  });
  return data;
};

export const deleteCategory = async ({ id }: ICategoryDelete) => {
  const { data } = await axios.delete<ICategory>('/category/' + id);
  return data;
};
