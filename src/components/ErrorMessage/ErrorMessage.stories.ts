import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage, { IProps as ErrorMessageProps } from './ErrorMessage';

// Metadata for the ErrorMessage component
const meta: Meta<ErrorMessageProps> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the ErrorMessage component
export const Default: Story = {
  args: {
    children: 'This is an error message',
  },
};

export const CustomText: Story = {
  args: {
    children: 'Custom error text here',
  },
};
