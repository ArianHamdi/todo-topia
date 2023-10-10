import type { Meta, StoryObj } from '@storybook/react';
import Button, { IButton } from './Button';

// Metadata for the component
const meta: Meta<IButton> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['filled', 'outline'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the Button component
export const Filled: Story = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};
