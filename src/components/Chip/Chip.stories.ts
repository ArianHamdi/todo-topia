import type { Meta, StoryObj } from '@storybook/react';
import Chip, { IProps as ChipProps } from './Chip';

// Metadata for the Chip component
const meta: Meta<ChipProps> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['completed', 'left'],
      },
    },
    count: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the Chip component
export const Completed: Story = {
  args: {
    variant: 'completed',
    count: 5,
  },
};

export const Left: Story = {
  args: {
    variant: 'left',
    count: 2,
  },
};

// You can also add more specific stories or scenarios if needed.
