import type { Meta, StoryObj } from '@storybook/angular';
import { PfSeparator } from 'pf';

type SeparatorArgs = Partial<{ orientation: 'horizontal' | 'vertical' }>;

const meta: Meta<SeparatorArgs> = {
  title: 'Atoms/Separator',
  component: PfSeparator,
  tags: ['autodocs'],
  render: (args: SeparatorArgs) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <span>Left</span>
        <pf-separator [orientation]="orientation" style="height: 32px;"></pf-separator>
        <span>Right</span>
      </div>
    `,
    moduleMetadata: { imports: [PfSeparator] }
  }),
  args: {
    orientation: 'vertical'
  }
};

export default meta;
type Story = StoryObj<SeparatorArgs>;

export const Vertical: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <span>Above</span>
        <pf-separator [orientation]="orientation"></pf-separator>
        <span>Below</span>
      </div>
    `,
    moduleMetadata: { imports: [PfSeparator] }
  })
};
