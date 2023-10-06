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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: api.deleteCategory,
    onMutate: async ({ id }) => {
      // Snapshot the previous value
      const snapshot = queryClient.getQueryData<ICategory[]>(['categories']);

      // Optimistically update to the new value
      queryClient.setQueryData<ICategory[]>(['categories'], old => {
        return old?.filter(category => category.id !== id);
      });

      // Redirect to landing page
      router.replace('/');

      // Return a context object with the snapshot value
      return { snapshot };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(['categories'], context?.snapshot);
    },
  });
};
