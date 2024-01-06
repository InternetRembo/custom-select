import '../src/index.css'
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    story: {
      height: '500px',
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
