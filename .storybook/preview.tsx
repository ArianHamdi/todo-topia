import type { Preview } from '@storybook/react';
import '../src/styles/globals.scss';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => {
      document.documentElement.setAttribute('data-theme', 'light');
      return <Story />;
    },
  ],
};

export default preview;
