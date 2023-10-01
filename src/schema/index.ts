import { ICategoryPost } from '@/types';
import Joi from 'joi';

export const categorySchema = Joi.object<ICategoryPost>({
  color: Joi.string().required(),
  title: Joi.string().required(),
});
