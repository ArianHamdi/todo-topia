import { Properties } from 'csstype';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  repeat: string;
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
