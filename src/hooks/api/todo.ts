import * as api from '@/api/todo';
import { ICategory } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
};

export const useCreateCategory = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: api.createCategory,
    onSuccess: (data: ICategory) => {
      router.push('/category/' + data.id);
    },
  });
};
