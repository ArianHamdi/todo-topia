import axios from '@/lib/axios';
import { ICategory, ICategoryDelete, ICategoryPost } from '@/types';

export const getCategories = async () => {
  const { data } = await axios.get<ICategory[]>('/category');
  return data;
};

export const createCategory = async ({ title, color }: ICategoryPost) => {
  const { data } = await axios.post<ICategory, any, ICategoryPost>(
    '/category',
    {
      title,
      color,
    }
  );
  return data;
};

export const deleteCategory = async ({ id }: ICategoryDelete) => {
  console.log('ICategoryDelete');
  const { data } = await axios.delete<ICategory>('/category/' + id);
  return data;
};
