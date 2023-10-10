import type { Meta, StoryObj } from '@storybook/react';
import CircleFilled, { IProps as CircleFilledProps } from './CircleFilled';

// Metadata for the CircleFilled component
const meta: Meta<CircleFilledProps> = {
  title: 'Components/CircleFilled',
  component: CircleFilled,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    background: { control: 'color' },
    size: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the CircleFilled component
export const Small: Story = {
  args: {
    background: 'red',
    size: 20,
  },
};

export const Medium: Story = {
  args: {
    background: 'blue',
    size: 40,
  },
};

export const Large: Story = {
  args: {
    background: 'green',
    size: 60,
  },
};

// You can also add more specific stories or scenarios if needed.
