import React from 'react'; // Important to render the story
import { addDecorator } from '@storybook/react';
import { setConfig } from 'react-hot-loader';
setConfig({ pureSFC: true });
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}