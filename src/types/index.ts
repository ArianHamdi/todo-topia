interface ITask {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  repeat: string;
}

interface ITodoList {
  id: string;
  title: string;
  categoryId: string;
  task?: Array<ITask>;
}

interface ICategory {
  id: string;
  title: string;
  color: string;
  todolist?: Array<ITodoList>;
}

interface GetCategoriesResponse {
  status: number;
  data: Array<ICategory>;
}

interface GetTodoListsResponse {
  status: number;
  data: Array<ITodoList>;
}
