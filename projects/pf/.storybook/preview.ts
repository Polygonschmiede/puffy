import type { Preview } from '@storybook/angular'
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'pf-surface',
      values: [
        { name: 'pf-surface', value: 'var(--pf-color-surface, #e9edf5)' },
        { name: 'white', value: '#ffffff' }
      ]
    },
    layout: 'padded'
  },
  decorators: [
    (story) => ({
      template: `<div class="sb-surface"><story /></div>`,
      styles: [
        `
        .sb-surface {
          background: var(--pf-color-surface, #e9edf5);
          min-height: 100vh;
          padding: 32px;
          font-family: var(--pf-typography-family, 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif);
        }
      `
      ]
    })
  ]
};

export default preview;
