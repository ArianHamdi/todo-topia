import yup from '@/lib/yup';

export const categorySchema = yup.object().shape({
  color: yup.string().required(),
  title: yup.string().required(),
});

export const todoListSchema = yup.object().shape({
  title: yup.string().required(),
  categoryId: yup.string(),
  description: yup.string(),
  left: yup.number(),
  completed: yup.number(),
});

export const taskSchema = yup.object().shape({
  todoListId: yup.string(),
  title: yup.string().required(),
  description: yup.string(),
  deadline: yup.date().optional(),
  status: yup.boolean(),
});
