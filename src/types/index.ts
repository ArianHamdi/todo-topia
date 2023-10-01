import { Properties } from "csstype";

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
  task?: ITask[];
}

export interface ICategory {
  id: string;
  title: string;
  color: Properties["color"];
  todolist?: ITodoList[];
}

export type ICategoryPost = Pick<ICategory, "title" | "color">;

export interface GetCategoriesResponse {
  status: number;
  data: ICategory[];
}

export interface GetTodoListsResponse {
  status: number;
  data: ITodoList[];
}
