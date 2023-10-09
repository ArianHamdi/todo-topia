import { ICategory, ICategoryAnalyze, ITask, ITodoList } from '@/types';
import { RGB } from '@tma.js/colors';
import { format, isFuture } from 'date-fns';
import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';

export const isServer = typeof window === 'undefined';

export const injectParamsToString = (
  str: string,
  params: Record<string, string | number>
): string => {
  for (const [key, value] of Object.entries(params)) {
    str = str.replace(new RegExp(`{${key}}`, 'g'), value.toString());
  }

  return str;
};

export const generateRandomHexColor = (): RGB => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color as RGB;
};

export const capitalizeFirstLetter = (text: string) => {
  return text.replace(/\b\w/g, match => match.toUpperCase());
};

export const findTodoListById = (
  categories: ICategory[] = [],
  todoListId: string
): ITodoList | undefined => {
  // Traverse each category
  for (let category of categories) {
    // Traverse each todoList within the current category
    for (let todoList of category.todoLists) {
      // Check if the current todoList's id matches the specified todoListId
      if (todoList.id === todoListId) {
        return todoList;
      }
    }
  }
};

export const sortTimelineTasks = (tasks: ITask[]) => {
  // Filter out tasks with no deadline or deadlines that are in the past
  const filteredTasks = tasks.filter(
    task => task.deadline && isFuture(task.deadline)
  );

  // Group tasks by just their date part (excluding time)
  const groupedTasks = groupBy(filteredTasks, task =>
    format(task.deadline!, 'dd MMMM yyyy')
  );

  // Sort the days in ascending order and sort tasks within each day
  const sortedDays = orderBy(
    Object.keys(groupedTasks),
    [day => new Date(day)],
    ['asc']
  );

  const result = sortedDays.map(day => ({
    day,
    tasks: orderBy(groupedTasks[day], ['status', 'deadline'], ['asc', 'asc']),
  }));

  return result;
};

export const generateNameAbbr = (
  firstName?: string,
  lastName?: string
): string => {
  const firstInitial = firstName ? firstName.split(' ')[0][0] : '';
  const lastInitial = lastName ? lastName.split(' ').slice(-1)[0][0] : '';
  return (firstInitial + lastInitial).toUpperCase();
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

export const analyzeTodoLists = (todoLists: ITodoList[]): ICategoryAnalyze => {
  let completed = 0;
  let left = 0;

  for (const todoList of todoLists) {
    completed += todoList.completed;
    left += todoList.left;
  }

  let completionPercentage = 0;
  const totalTasks = completed + left;
  if (totalTasks !== 0) {
    completionPercentage = (completed / totalTasks) * 100;
  }

  return {
    completed,
    left,
    totalTasks,
    completionPercentage,
  };
};
