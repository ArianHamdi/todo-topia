import * as api from '@/api/todo';
import { ICategory } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
};

export const useCreateCategory = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createCategory,
    onSuccess: (data: ICategory) => {
      router.push('/category/' + data.id);
      queryClient.setQueryData<ICategory[]>(['categories'], prev => {
        if (!prev) return;
        return [...prev, data];
      });
    },
  });
};
