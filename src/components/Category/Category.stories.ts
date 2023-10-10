import type { Meta, StoryObj } from '@storybook/react';
import Category from './Category';
import type { ICategory } from '@/types';

// Metadata for the Category component
const meta: Meta<ICategory> = {
  title: 'Components/Category',
  component: Category,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: { control: 'color' },
    title: { control: 'text' },
    id: { control: 'text' },
    todoLists: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the Category component
export const WorkCategory: Story = {
  args: {
    color: '#ff4500',
    title: 'Work',
    id: '1',
    todoLists: [
      {
        id: '1',
        title: 'Work List',
        completed: 8,
        left: 5,
        tasks: [],
        categoryId: '65465489',
      },
    ],
  },
};

export const HomeCategory: Story = {
  args: {
    color: '#228B22',
    title: 'Home',
    id: '2',
    todoLists: [
      {
        id: '1',
        title: 'Home List',
        completed: 11,
        left: 4,
        tasks: [],
        categoryId: '9856654321',
      },
    ],
  },
};
