import axios from '@/lib/axios';
import { ITask, ITaskPost, ITaskEdit, ITaskDelete } from '@/types';

export const createTask = async (body: ITaskPost) => {
  const { data } = await axios.post<ITask>('/task', body);
  return data;
};

export const editTask = async ({ id, ...body }: ITaskEdit) => {
  const { data } = await axios.put<ITask>('/task/' + id, body);
  return data;
};

export const deleteTask = async ({ id }: ITaskDelete) => {
  const { data } = await axios.delete<ITask>('/task/' + id);
  return data;
};
