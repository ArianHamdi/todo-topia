import { Properties } from 'csstype';

export type RequiredName<T> = T & { name: string };

export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline?: Date;
  repeat?: string;
}

export interface ITodoList {
  id: string;
  title: string;
  categoryId: string;
  tasks?: ITask[];
}

export interface ICategory {
  id: string;
  title: string;
  color: Properties['color'];
  todoLists?: ITodoList[];
}

export type ICategoryPost = Pick<ICategory, 'title' | 'color'>;
export type ITodoListPost = Pick<ITodoList, 'title' | 'categoryId'>;
export type ITaskPost = Pick<
  ITask,
  'title' | 'description' | 'deadline' | 'repeat'
>;
