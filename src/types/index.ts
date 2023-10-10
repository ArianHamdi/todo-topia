import { Properties } from 'csstype';

export type Locales = 'en' | 'es' | 'fr' | 'de' | 'it';

export type RequiredName<T> = T & { name: string };

export type IFormErrorObj = {
  key: IFormError;
  values: Record<string, string>;
};
export type IFormError = 'required';

export type IFormType = 'create' | 'edit';
export interface ITask {
  todoListId: string;
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  repeat?: string;
  status?: boolean;
}

export type ITaskPost = Omit<ITask, 'id'>;
export type ITaskEdit = Omit<ITask, 'todoListId'>;
export type ITaskDelete = Pick<ITask, 'id'>;

export interface ITodoList {
  id: string;
  title: string;
  categoryId: string;
  description?: string;
  left: number;
  completed: number;
  tasks: ITask[];
}
export type ITodoListGet = Pick<ITodoList, 'id'>;
export type ITodoListPost = Pick<ITodoList, 'title' | 'categoryId'>;
export type ITodoListEdit = Pick<ITodoList, 'title' | 'categoryId' | 'id'>;
export type ITodoListDelete = Pick<ITodoList, 'id'>;

export interface ICategory {
  id: string;
  title: string;
  color: Properties['color'];
  todoLists: ITodoList[];
}
export type ICategoryPost = Pick<ICategory, 'title' | 'color'>;
export type ICategoryEdit = Pick<ICategory, 'title' | 'color' | 'id'>;
export type ICategoryDelete = Pick<ICategory, 'id'>;

export interface ICategoryAnalyze {
  completed: number;
  left: number;
  totalTasks: number;
  completionPercentage: number;
}
