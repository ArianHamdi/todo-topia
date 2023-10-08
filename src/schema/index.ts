import yup from '@/lib/yup';

export const categorySchema = yup.object().shape({
  color: yup.string().required(),
  title: yup.string().required(),
});

export const todoListSchema = yup.object().shape({
  title: yup.string().required(),
  categoryId: yup.string().required(),
  left: yup.number(),
  completed: yup.number(),
});

export const taskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  deadline: yup.date(),
  repeat: yup.string().oneOf(['daily', 'weekly', 'monthly']),
  status: yup.boolean().required(),
});
