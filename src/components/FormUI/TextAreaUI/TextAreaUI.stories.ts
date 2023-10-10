import type { Meta, StoryObj } from '@storybook/react';
import TextAreaUI, { ITextAreaUI } from './TextAreaUI';

// Metadata for the TextAreaUI component
const meta: Meta<ITextAreaUI> = {
  title: 'Components/Form/TextAreaUI',
  component: TextAreaUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories for the TextAreaUI component
export const BasicTextArea: Story = {
  args: {
    label: 'Comments',
  },
};

export const LargeTextArea: Story = {
  args: {
    label: 'Description',
    rows: 10,
  },
};

export const AutoFocusTextArea: Story = {
  args: {
    label: 'Quick Notes',
    autoFocus: true,
  },
};
