import { ICategoryPost, ITaskPost, ITodoListPost } from '@/types';
import Joi from 'joi';

export const categorySchema = Joi.object<ICategoryPost>({
  color: Joi.string().required(),
  title: Joi.string().required(),
});

export const todoListSchema = Joi.object<ITodoListPost>({
  title: Joi.string().required(),
  categoryId: Joi.string().required(),
});

export const taskSchema = Joi.object<ITaskPost>({
  title: Joi.string().required(),
  description: Joi.string(),
  deadline: Joi.date(),
  repeat: Joi.string().valid('daily', 'weekly', 'monthly'),
});
