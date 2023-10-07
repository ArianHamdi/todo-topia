import { Properties } from 'csstype';

export type RequiredName<T> = T & { name: string };

export type IFormType = 'create' | 'edit';
export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  repeat?: string;
}

export type ITaskPost = Omit<ITask, 'id'>;
export type ITaskEdit = ITask;
export type ITaskDelete = Pick<ITask, 'id'>;

export interface ITodoList {
  id: string;
  title: string;
  categoryId: string;
  tasks?: ITask[];
}
export type ITodoListPost = Pick<ITodoList, 'title' | 'categoryId'>;
export type ITodoListEdit = Pick<ITodoList, 'title' | 'categoryId' | 'id'>;
export type ITodoListDelete = Pick<ITodoList, 'id'>;

export interface ICategory {
  id: string;
  title: string;
  color: Properties['color'];
  todoLists?: ITodoList[];
}
export type ICategoryPost = Pick<ICategory, 'title' | 'color'>;
export type ICategoryEdit = Pick<ICategory, 'title' | 'color' | 'id'>;
export type ICategoryDelete = Pick<ICategory, 'id'>;
