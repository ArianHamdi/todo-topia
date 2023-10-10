import type { Meta, StoryObj } from '@storybook/react';
import TextFieldUI, { ITextFieldUI } from './TextFieldUI';

// Metadata for the TextFieldUI component
const meta: Meta<ITextFieldUI> = {
  title: 'Components/Form/TextFieldUI',
  component: TextFieldUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the TextFieldUI component
export const BasicTextField: Story = {
  args: {
    label: 'Username',
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
};
