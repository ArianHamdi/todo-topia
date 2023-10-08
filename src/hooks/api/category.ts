import * as api from '@/api/category';
import { ICategory } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@/hooks/useRouter';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories,
  });
};

export const useCategory = (id: string) => {
  const result = useCategories();
  const data = result.data?.find(category => category.id === id);

  return {
    ...result,
    data,
  };
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

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: api.editCategory,
    onMutate: async variables => {
      const snapshot = queryClient.getQueryData<ICategory[]>(['categories']);

      // Optimistically update to the new value
      queryClient.setQueryData<ICategory[]>(['categories'], prev => {
        return prev?.map(category => {
          if (category.id === variables.id) {
            return {
              ...category,
              ...variables,
            };
          } else {
            return category;
          }
        });
      });

      // Redirect to landing page
      router.replace('/category/' + variables.id);

      // Return a context object with the snapshot value
      return { snapshot };
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
