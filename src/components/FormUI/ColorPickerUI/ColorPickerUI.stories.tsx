import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import ColorPickerUI, { IColorPickerUI } from './ColorPickerUI';

// Metadata for the ColorPickerUI component
const meta: Meta = {
  title: 'Components/Form/ColorPickerUI',
  component: ColorPickerUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'color' },
  },
};

export default meta;

// Stories for the ColorPickerUI component
export const DarkColor = () => {
  const [color, setColor] = useState('#36454F');

  const handleChange = (newColor: string) => {
    setColor(newColor);
  };

  return <ColorPickerUI value={color} label='Color' onChange={handleChange} />;
};

export const LightColor = () => {
  const [color, setColor] = useState('#ffaa23');

  const handleChange = (newColor: string) => {
    setColor(newColor);
  };

  return <ColorPickerUI value={color} label='Color' onChange={handleChange} />;
};
