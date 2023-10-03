import axios from '@/lib/axios';
import { ICategory, ICategoryPost } from '@/types';

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
