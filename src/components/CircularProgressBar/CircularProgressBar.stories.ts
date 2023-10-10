import type { Meta, StoryObj } from '@storybook/react';
import CircularProgressBar, { IProps } from './CircularProgressBar';

// Metadata for the CircularProgressBar component
const meta: Meta<IProps> = {
  title: 'Components/CircularProgressBar',
  component: CircularProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    percentage: { control: 'range', min: 0, max: 100, step: 1 },
    stroke: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the CircularProgressBar component
export const PartialCompletion: Story = {
  args: {
    percentage: 25,
    stroke: '#ff4500',
  },
};

export const FullCompletion: Story = {
  args: {
    percentage: 100,
    stroke: '#228B22',
  },
};
